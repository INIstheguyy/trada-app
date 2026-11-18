import {
  Alert,
  Button,
  EmptyState,
  FormField,
  Input,
  PageHeader,
  Select,
  Surface,
  Textarea,
} from '@trada/ui';
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  FilePenLine,
  Mic,
  PackageCheck,
  Square,
  Trash2,
} from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import {
  useCreateProductMutation,
  useCreateProductFromImageMutation,
  useCreateVoiceProductDraftMutation,
  useCreateVoiceProductUpdateDraftMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  type ProductInput,
  type ImageProductResult,
  type VoiceProductDraft,
  type VoiceProductDraftRequest,
  type ProductUpdateInput,
} from '../../lib/api';
import { readApiError } from '../../lib/apiError';

const emptyProduct: ProductInput = {
  name: '',
  description: '',
  type: 'inventory_based',
  category: '',
  unit: 'piece',
  quantity: 0,
  stockThreshold: 0,
  costPrice: null,
  sellingPrice: 0,
  discountPrice: null,
  condition: 'new',
  location: '',
  sku: '',
  barcode: '',
  isActive: true,
};

type VoiceRecordingPreview = { blob: Blob; durationSeconds: number; mimeType: string; url: string };
type ProductUpdateConflict = {
  serverCurrentUpdatedAt: string;
  currentProduct: { id: string; name: string; quantity: number; sellingPrice: number };
};
const maxAudioBytes = 10 * 1024 * 1024;
const maxAudioDurationSeconds = 60;
const maxImageBytes = 5 * 1024 * 1024;

function productUpdateConflictFrom(reason: unknown): ProductUpdateConflict | undefined {
  if (typeof reason !== 'object' || reason === null) return undefined;
  const response = reason as { status?: unknown; data?: unknown };
  if (response.status !== 409 || typeof response.data !== 'object' || response.data === null)
    return undefined;
  const data = response.data as {
    error?: unknown;
    data?: { conflictDetails?: { serverCurrentUpdatedAt?: unknown; currentProduct?: unknown } };
  };
  const details = data.data?.conflictDetails;
  const current = details?.currentProduct;
  if (
    data.error !== 'CONCURRENT_MODIFICATION' ||
    typeof details?.serverCurrentUpdatedAt !== 'string' ||
    typeof current !== 'object' ||
    current === null
  )
    return undefined;
  const product = current as Record<string, unknown>;
  if (
    typeof product.id !== 'string' ||
    typeof product.name !== 'string' ||
    typeof product.quantity !== 'number' ||
    typeof product.sellingPrice !== 'number'
  )
    return undefined;
  return {
    serverCurrentUpdatedAt: details.serverCurrentUpdatedAt,
    currentProduct: {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      sellingPrice: product.sellingPrice,
    },
  };
}

export function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');
  const {
    data: existing,
    isLoading: isLoadingProduct,
    isError: loadFailed,
    refetch,
  } = useGetProductQuery(id ?? '', { skip: !id });
  const [createProduct, createState] = useCreateProductMutation();
  const [createProductFromImage, imageCreateState] = useCreateProductFromImageMutation();
  const [createVoiceProductDraft, voiceDraftState] = useCreateVoiceProductDraftMutation();
  const [createVoiceProductUpdateDraft, voiceUpdateDraftState] =
    useCreateVoiceProductUpdateDraftMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();
  const [deleteProduct, deleteState] = useDeleteProductMutation();
  const [product, setProduct] = useState<ProductInput>(emptyProduct);
  const [error, setError] = useState<string>();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [voiceDraft, setVoiceDraft] = useState<VoiceProductDraft>();
  const [voiceError, setVoiceError] = useState<string>();
  const [voiceUpdateText, setVoiceUpdateText] = useState('');
  const [voiceUpdateDraft, setVoiceUpdateDraft] = useState<VoiceProductDraft>();
  const [voiceUpdateError, setVoiceUpdateError] = useState<string>();
  const [voiceUpdateConflict, setVoiceUpdateConflict] = useState<ProductUpdateConflict>();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingElapsedSeconds, setRecordingElapsedSeconds] = useState(0);
  const [audioPreview, setAudioPreview] = useState<VoiceRecordingPreview>();
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();
  const [imageError, setImageError] = useState<string>();
  const [imageResult, setImageResult] = useState<ImageProductResult>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const recordingStartedAtRef = useRef<number | null>(null);
  const audioPreviewUrlRef = useRef<string | null>(null);
  const voiceEntryRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (existing) {
      setProduct({
        name: existing.name,
        description: existing.description,
        type: existing.type,
        category: existing.category,
        unit: existing.unit,
        quantity: existing.quantity,
        stockThreshold: existing.stockThreshold,
        costPrice: existing.costPrice,
        sellingPrice: existing.sellingPrice,
        discountPrice: existing.discountPrice,
        condition: existing.condition,
        location: existing.location,
        sku: existing.sku,
        barcode: existing.barcode,
        isActive: existing.isActive,
      });
    }
  }, [existing]);

  useEffect(
    () => () => {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioPreviewUrlRef.current) URL.revokeObjectURL(audioPreviewUrlRef.current);
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    },
    [imagePreviewUrl],
  );

  useEffect(() => {
    if (!isRecordingVoice) return;
    const timer = window.setInterval(() => {
      setRecordingElapsedSeconds(
        Math.max(
          0,
          Math.floor((Date.now() - (recordingStartedAtRef.current ?? Date.now())) / 1000),
        ),
      );
    }, 250);
    return () => window.clearInterval(timer);
  }, [isRecordingVoice]);

  useEffect(() => {
    if (isEditing || searchParams.get('ai') !== 'voice') return;
    const frame = window.requestAnimationFrame(() => {
      voiceEntryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      voiceEntryRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isEditing, searchParams]);

  async function generateVoiceDraft(input: VoiceProductDraftRequest) {
    setVoiceError(undefined);
    setVoiceDraft(undefined);
    try {
      const draft = await createVoiceProductDraft(input).unwrap();
      setVoiceDraft(draft);
    } catch (reason) {
      setVoiceError(
        readApiError(reason, 'We couldnâ€™t prepare a product draft. Complete the form manually.'),
      );
    }
  }

  function discardAudioPreview() {
    if (audioPreviewUrlRef.current) URL.revokeObjectURL(audioPreviewUrlRef.current);
    audioPreviewUrlRef.current = null;
    setAudioPreview(undefined);
  }

  async function startVoiceRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setVoiceError(
        'Voice recording requires HTTPS on another device. Type the product description instead.',
      );
      return;
    }
    setVoiceError(undefined);
    setVoiceDraft(undefined);
    discardAudioPreview();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      recordingChunksRef.current = [];
      recordingStartedAtRef.current = Date.now();
      setRecordingElapsedSeconds(0);
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) recordingChunksRef.current.push(event.data);
      });
      recorder.addEventListener('stop', () => {
        const recording = new Blob(recordingChunksRef.current, {
          type: recorder.mimeType || mimeType,
        });
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        setIsRecordingVoice(false);
        const durationSeconds = Math.max(
          1,
          Math.round((Date.now() - (recordingStartedAtRef.current ?? Date.now())) / 1000),
        );
        setRecordingElapsedSeconds(durationSeconds);
        if (recording.size === 0) {
          setVoiceError(
            'No audio was captured. Try recording again or type the product description instead.',
          );
          return;
        }
        const url = URL.createObjectURL(recording);
        audioPreviewUrlRef.current = url;
        setAudioPreview({
          blob: recording,
          durationSeconds,
          mimeType: recording.type || 'audio/webm',
          url,
        });
      });
      recorder.start();
      setIsRecordingVoice(true);
    } catch {
      setVoiceError(
        'We could not access your microphone. Allow microphone access or type the product description instead.',
      );
    }
  }

  function stopVoiceRecording() {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
  }

  function prepareAudioVoiceDraft() {
    if (!audioPreview) return;
    if (audioPreview.durationSeconds > maxAudioDurationSeconds) {
      setVoiceError('Keep voice recordings to 60 seconds or less, then try again.');
      return;
    }
    if (audioPreview.blob.size > maxAudioBytes) {
      setVoiceError('Keep voice recordings to 10 MB or less, then try again.');
      return;
    }
    void recordingToDataUrl(audioPreview.blob).then((audio) =>
      generateVoiceDraft({ audio, mimeType: audioPreview.mimeType }),
    );
  }

  function prepareTypedVoiceDraft() {
    const text = voiceText.trim();
    if (!text) {
      setVoiceError('Enter a product description to prepare a typed draft.');
      return;
    }
    void generateVoiceDraft({ text });
  }

  function applyVoiceDraft() {
    if (!voiceDraft) return;
    const fields = voiceDraft.draft ?? voiceDraft.extractedFields ?? voiceDraft.product;
    if (!fields) return;
    setProduct((current) => ({
      ...current,
      name: fields.name ?? current.name,
      description: fields.description ?? current.description,
      type: fields.type ?? current.type,
      category: fields.category ?? current.category,
      unit: fields.unit ?? current.unit,
      quantity: fields.quantity ?? current.quantity,
      stockThreshold: fields.stockThreshold ?? current.stockThreshold,
      costPrice: fields.costPrice ?? current.costPrice,
      sellingPrice: fields.sellingPrice ?? current.sellingPrice,
      discountPrice: fields.discountPrice ?? current.discountPrice,
      condition: fields.condition ?? current.condition,
      location: fields.location ?? current.location,
      sku: fields.sku ?? current.sku,
      barcode: fields.barcode ?? current.barcode,
      isActive: fields.isActive ?? current.isActive,
    }));
    setVoiceDraft(undefined);
    setVoiceError(undefined);
  }

  async function prepareVoiceUpdateSuggestion() {
    if (!id) return;
    const text = voiceUpdateText.trim();
    if (!text) {
      setVoiceUpdateError('Describe the proposed change first.');
      return;
    }
    setVoiceUpdateError(undefined);
    setVoiceUpdateDraft(undefined);
    setVoiceUpdateConflict(undefined);
    try {
      const draft = await createVoiceProductUpdateDraft({ id, text }).unwrap();
      setVoiceUpdateDraft(draft);
    } catch (reason) {
      setVoiceUpdateError(
        readApiError(
          reason,
          'We couldnâ€™t prepare an update suggestion. Update this product manually.',
        ),
      );
    }
  }

  async function applyVoiceUpdate(expectedUpdatedAt?: string) {
    if (!id || !voiceUpdateDraft?.draft || !voiceUpdateDraft.stockMovement) return;
    const fields = voiceUpdateDraft.draft;
    const changes = Object.fromEntries(
      Object.entries({
        name: fields.name,
        description: fields.description,
        type: fields.type,
        category: fields.category,
        unit: fields.unit,
        quantity: fields.quantity,
        stockThreshold: fields.stockThreshold,
        costPrice: fields.costPrice,
        sellingPrice: fields.sellingPrice,
        discountPrice: fields.discountPrice,
        condition: fields.condition,
        location: fields.location,
        sku: fields.sku,
        barcode: fields.barcode,
        isActive: fields.isActive,
        currentUpdatedAt: expectedUpdatedAt ?? voiceUpdateDraft.stockMovement.currentUpdatedAt,
      }).filter(([, value]) => value !== undefined),
    ) as ProductUpdateInput;
    if (Object.keys(changes).length <= 1) return;

    setVoiceUpdateError(undefined);
    setVoiceUpdateConflict(undefined);
    try {
      await updateProduct({ id, changes }).unwrap();
      setProduct((current) => ({ ...current, ...changes }));
      setVoiceUpdateDraft(undefined);
      await refetch();
    } catch (reason) {
      const conflict = productUpdateConflictFrom(reason);
      if (conflict) {
        setVoiceUpdateConflict(conflict);
        return;
      }
      setVoiceUpdateError(
        readApiError(reason, 'We couldnâ€™t apply this reviewed update. Try again or edit manually.'),
      );
    }
  }

  function selectImage(file?: File) {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageResult(undefined);
    setImageError(undefined);
    if (file && file.size > maxImageBytes) {
      setImageFile(undefined);
      setImagePreviewUrl(undefined);
      setImageError('Choose an image that is 5 MB or smaller.');
      return;
    }
    setImageFile(file);
    setImagePreviewUrl(file ? URL.createObjectURL(file) : undefined);
  }

  async function prepareImageProductDraft() {
    if (!imageFile) {
      setImageError('Choose a product image first.');
      return;
    }
    if (!product.location?.trim()) {
      setImageError('Enter the storage location for the draft.');
      return;
    }
    if (imageFile.size > maxImageBytes) {
      setImageError('Choose an image that is 5 MB or smaller.');
      return;
    }
    setImageError(undefined);
    setImageResult(undefined);
    try {
      const image = await fileToDataUrl(imageFile);
      const result = await createProductFromImage({
        image,
        location: product.location.trim(),
      }).unwrap();
      setImageResult(result);
    } catch (reason) {
      setImageError(readApiError(reason, 'We couldnâ€™t prepare a product draft from this image.'));
    }
  }

  function applyImageDraft() {
    const fields = imageResult?.draft ?? imageResult?.extractedFields;
    if (!fields) return;
    setProduct((current) => ({
      ...current,
      name: fields.name ?? current.name,
      description: fields.description ?? current.description,
      type: fields.type ?? current.type,
      category: fields.category ?? current.category,
      unit: fields.unit ?? current.unit,
      quantity: fields.quantity ?? current.quantity,
      stockThreshold: fields.stockThreshold ?? current.stockThreshold,
      costPrice: fields.costPrice ?? current.costPrice,
      sellingPrice: fields.sellingPrice ?? current.sellingPrice,
      discountPrice: fields.discountPrice ?? current.discountPrice,
      condition: fields.condition ?? current.condition,
      location: fields.location ?? current.location,
      sku: fields.sku ?? current.sku,
      barcode: fields.barcode ?? current.barcode,
      isActive: fields.isActive ?? current.isActive,
    }));
    setImageResult(undefined);
    setImageError(undefined);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    try {
      if (id) await updateProduct({ id, changes: product }).unwrap();
      else await createProduct(product).unwrap();
      navigate('/products', { replace: true });
    } catch (reason) {
      setError(
        readApiError(reason, 'We couldn’t save this product. Check the details and try again.'),
      );
    }
  }

  async function handleDelete() {
    if (!id) return;
    setError(undefined);
    try {
      await deleteProduct(id).unwrap();
      navigate('/products', { replace: true });
    } catch (reason) {
      setError(readApiError(reason, 'We couldn’t delete this product. Try again.'));
      setConfirmDelete(false);
    }
  }

  if (isEditing && isLoadingProduct) return <ProductFormSkeleton />;

  if (isEditing && loadFailed)
    return (
      <div className="products-page">
        <EmptyState
          className="products-feedback"
          icon={<Boxes aria-hidden="true" size={28} />}
          title="We couldn’t load this product"
          description="The record may be unavailable, or the connection may have failed."
          action={
            <div className="product-load-actions">
              <Button variant="secondary" onClick={() => void refetch()}>
                Try again
              </Button>
              <Button asChild variant="ghost">
                <Link to="/products">Back to products</Link>
              </Button>
            </div>
          }
        />
      </div>
    );

  return (
    <div className="products-page product-form-page">
      <Link className="back-link" to="/products">
        <ArrowLeft aria-hidden="true" size={16} /> Products
      </Link>
      <PageHeader
        eyebrow={isEditing ? 'Inventory record' : 'New inventory record'}
        title={isEditing ? 'Edit product' : 'Add a product'}
        description={
          isEditing
            ? 'Update the selling details and stock information recorded for this product.'
            : 'Start with the information needed to identify, price and track this product.'
        }
      />

      <form onSubmit={handleSubmit}>
        {error && (
          <Alert tone="error" icon={<AlertTriangle aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        )}

        {!isEditing && (
          <section
            className="voice-entry-target"
            ref={voiceEntryRef}
            tabIndex={-1}
            aria-label="AI voice product capture"
          >
            <Surface className="product-form-section voice-draft-entry">
            <div className="form-section-heading">
              <div>
                <h2>Add product by voice</h2>
                <p>Record a description, review the draft, then save this form normally.</p>
              </div>
            </div>
            <div className="voice-draft-entry__actions">
              <Button
                type="button"
                variant="secondary"
                loading={voiceDraftState.isLoading && !isRecordingVoice}
                onClick={() =>
                  isRecordingVoice ? stopVoiceRecording() : void startVoiceRecording()
                }
                icon={
                  isRecordingVoice ? (
                    <Square aria-hidden="true" size={16} fill="currentColor" />
                  ) : (
                    <Mic aria-hidden="true" size={17} />
                  )
                }
              >
                {isRecordingVoice ? 'Stop recording' : 'Start voice recording'}
              </Button>
              <small>
                {isRecordingVoice
                  ? `Recording ${formatRecordingDuration(recordingElapsedSeconds)} â€” tap stop when finished.`
                  : 'The AI only prepares a draft. It cannot create a product from this action.'}
              </small>
            </div>
            {audioPreview && (
              <div className="voice-recording-preview">
                <div>
                  <strong>Recording ready</strong>
                  <span>
                    {formatRecordingDuration(audioPreview.durationSeconds)} Â·{' '}
                    {formatFileSize(audioPreview.blob.size)}
                  </span>
                </div>
                <audio controls preload="metadata" src={audioPreview.url}>
                  Your browser cannot play this recording.
                </audio>
                <div className="voice-recording-preview__actions">
                  <Button
                    type="button"
                    variant="secondary"
                    loading={voiceDraftState.isLoading}
                    onClick={prepareAudioVoiceDraft}
                  >
                    Prepare audio draft
                  </Button>
                  <Button type="button" variant="ghost" onClick={discardAudioPreview}>
                    Discard recording
                  </Button>
                </div>
              </div>
            )}
            <details className="voice-draft-entry__fallback">
              <summary>Canâ€™t record? Type a product description instead</summary>
              <FormField htmlFor="voice-product-text" label="Product description">
                <Textarea
                  id="voice-product-text"
                  rows={3}
                  value={voiceText}
                  onChange={(event) => setVoiceText(event.target.value)}
                  placeholder="For example: 30 bags of Semovita, cost 11k, sell 13.5k, in the warehouse."
                />
              </FormField>
              <Button
                type="button"
                variant="ghost"
                loading={voiceDraftState.isLoading}
                onClick={prepareTypedVoiceDraft}
                icon={<FilePenLine aria-hidden="true" size={17} />}
              >
                Prepare typed draft
              </Button>
            </details>
            {voiceError && <Alert tone="warning">{voiceError}</Alert>}
            {voiceDraft && (
              <div className="voice-draft-review" aria-live="polite">
                <Alert tone="warning">
                  No product has been created. Review the extracted details before saving this form.
                </Alert>
                <div className="voice-draft-review__transcript">
                  <span>Transcript</span>
                  <p>{voiceDraft.transcript}</p>
                </div>
                <div className="voice-draft-review__actions">
                  <Button type="button" onClick={applyVoiceDraft}>
                    Use details in product form
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setVoiceDraft(undefined)}>
                    Discard draft
                  </Button>
                </div>
              </div>
            )}
            </Surface>
          </section>
        )}

        {!isEditing && (
          <Surface className="product-form-section image-product-test">
            <div className="form-section-heading">
              <div>
                <h2>Add product from image</h2>
                <p>
                  Use a package, product or shelf label to prepare an editable product draft.
                </p>
              </div>
            </div>
            <Alert tone="info">No product is created until you review the form and select Save product.</Alert>
            <FormField htmlFor="product-image-upload" label="Product image">
              <Input
                id="product-image-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={(event) => selectImage(event.target.files?.[0])}
              />
            </FormField>
            <FormField
              htmlFor="image-product-location"
              label="Storage location"
              required
              hint="This is sent with the draft request. Images must be 5 MB or smaller."
            >
              <Input
                id="image-product-location"
                value={product.location ?? ''}
                onChange={(event) => setProduct({ ...product, location: event.target.value })}
                required
              />
            </FormField>
            {imagePreviewUrl && (
              <img
                className="image-product-test__preview"
                src={imagePreviewUrl}
                alt="Selected product for extraction"
              />
            )}
            <div className="voice-draft-review__actions">
              <Button
                type="button"
                variant="secondary"
                loading={imageCreateState.isLoading}
                onClick={() => void prepareImageProductDraft()}
              >
                Prepare image draft
              </Button>
              {imageFile && (
                <Button type="button" variant="ghost" onClick={() => selectImage()}>
                  Clear image
                </Button>
              )}
            </div>
            {imageError && <Alert tone="error">{imageError}</Alert>}
            {imageResult && (
              <div className="voice-draft-review" aria-live="polite">
                <Alert tone="warning">
                  No product has been created. Review the extracted details before applying them to
                  this form.
                </Alert>
                {imageResult.ambiguousFields?.length ? (
                  <Alert tone="warning">Check: {imageResult.ambiguousFields.join(', ')}.</Alert>
                ) : null}
                <div className="voice-draft-review__actions">
                  <Button type="button" onClick={applyImageDraft}>
                    Use details in product form
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setImageResult(undefined)}>
                    Discard draft
                  </Button>
                </div>
              </div>
            )}
          </Surface>
        )}

        {isEditing && (
          <Surface className="product-form-section voice-draft-entry">
            <div className="form-section-heading">
              <div>
                <h2>Review product update by voice</h2>
                <p>Describe a proposed price or stock change. Trada returns a suggestion only.</p>
              </div>
            </div>
            <Alert tone="info">
              Trada checks this product has not changed elsewhere before applying a reviewed voice
              update.
            </Alert>
            <FormField
              htmlFor="voice-product-update-text"
              label="Proposed product change"
              hint="For example: add 10 bags and change selling price to 4,500."
            >
              <Textarea
                id="voice-product-update-text"
                rows={3}
                value={voiceUpdateText}
                onChange={(event) => setVoiceUpdateText(event.target.value)}
              />
            </FormField>
            <div className="voice-draft-review__actions">
              <Button
                type="button"
                variant="secondary"
                loading={voiceUpdateDraftState.isLoading}
                onClick={() => void prepareVoiceUpdateSuggestion()}
                icon={<FilePenLine aria-hidden="true" size={17} />}
              >
                Prepare update suggestion
              </Button>
            </div>
            {voiceUpdateError && <Alert tone="warning">{voiceUpdateError}</Alert>}
            {voiceUpdateDraft && (
              <div className="voice-draft-review" aria-live="polite">
                <div className="voice-draft-review__transcript">
                  <span>Transcript</span>
                  <p>{voiceUpdateDraft.transcript}</p>
                </div>
                <div className="voice-update-suggestion">
                  <strong>Extracted suggestion</strong>
                  <p>
                    {voiceUpdateDraft.stockMovement
                      ? `Stock: ${voiceUpdateDraft.stockMovement.currentQuantity} ${voiceUpdateDraft.stockMovement.quantityMode === 'subtract' ? '−' : '+'} ${voiceUpdateDraft.stockMovement.quantityDelta} → ${voiceUpdateDraft.stockMovement.resultingQuantity}. `
                      : voiceUpdateDraft.extractedFields?.quantityMode
                        ? `Quantity: ${voiceUpdateDraft.extractedFields.quantityMode} ${voiceUpdateDraft.extractedFields.quantity ?? 'not provided'}. `
                      : ''}
                    {(voiceUpdateDraft.draft?.sellingPrice ?? voiceUpdateDraft.extractedFields?.sellingPrice) != null
                      ? `Selling price: ₦${voiceUpdateDraft.draft?.sellingPrice ?? voiceUpdateDraft.extractedFields?.sellingPrice}.`
                      : 'No sale-ready product change was extracted.'}
                  </p>
                </div>
                <Alert tone="warning">
                  No product change has been made yet. Review the proposed stock and price before
                  applying it.
                </Alert>
                <div className="voice-draft-review__actions">
                  <Button
                    type="button"
                    loading={updateState.isLoading}
                    disabled={!voiceUpdateDraft.draft || !voiceUpdateDraft.stockMovement}
                    onClick={() => void applyVoiceUpdate()}
                  >
                    Apply reviewed update
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setVoiceUpdateDraft(undefined)}
                  >
                    Discard suggestion
                  </Button>
                </div>
              </div>
            )}
            {voiceUpdateConflict && (
              <div className="voice-draft-review" role="alert">
                <Alert tone="warning">
                  This product changed on another device. Current stock: {voiceUpdateConflict.currentProduct.quantity}; current selling price: ₦{voiceUpdateConflict.currentProduct.sellingPrice}.
                </Alert>
                <div className="voice-draft-review__actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      void refetch();
                      void prepareVoiceUpdateSuggestion();
                    }}
                  >
                    Recalculate voice update
                  </Button>
                  <Button
                    type="button"
                    loading={updateState.isLoading}
                    onClick={() => void applyVoiceUpdate(voiceUpdateConflict.serverCurrentUpdatedAt)}
                  >
                    Confirm overwrite
                  </Button>
                </div>
              </div>
            )}
          </Surface>
        )}

        <div className="product-form-layout">
          <div className="product-form-main">
            <Surface className="product-form-section">
              <div className="form-section-heading">
                <span className="form-section-heading__step">01</span>
                <div>
                  <h2>Product details</h2>
                  <p>Use names and identifiers your team can recognize quickly.</p>
                </div>
              </div>
              <div className="form-grid">
                <TextField
                  id="product-name"
                  label="Product name"
                  value={product.name}
                  onChange={(value) => setProduct({ ...product, name: value })}
                  required
                  autoComplete="off"
                />
                <TextField
                  id="product-category"
                  label="Category"
                  value={product.category ?? ''}
                  onChange={(value) => setProduct({ ...product, category: value })}
                  hint="Use your existing business category wording."
                />
                <FormField
                  className="product-form-field--wide"
                  htmlFor="product-description"
                  label="Description"
                >
                  <Textarea
                    id="product-description"
                    value={product.description ?? ''}
                    onChange={(event) =>
                      setProduct({ ...product, description: event.target.value })
                    }
                    rows={3}
                  />
                </FormField>
                <FormField htmlFor="product-type" label="Product type" required>
                  <Select
                    id="product-type"
                    value={product.type}
                    onChange={(event) =>
                      setProduct({ ...product, type: event.target.value as ProductInput['type'] })
                    }
                    required
                  >
                    <option value="inventory_based">Inventory based</option>
                    <option value="input_based">Input based / service</option>
                  </Select>
                </FormField>
                <FormField htmlFor="product-condition" label="Condition" required>
                  <Select
                    id="product-condition"
                    value={product.condition}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        condition: event.target.value as ProductInput['condition'],
                      })
                    }
                    required
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="foreign_used">Foreign used</option>
                  </Select>
                </FormField>
                <TextField
                  id="product-sku"
                  label="SKU"
                  value={product.sku ?? ''}
                  onChange={(value) => setProduct({ ...product, sku: value })}
                  hint="Must be unique when provided."
                />
                <TextField
                  id="product-barcode"
                  label="Barcode"
                  value={product.barcode ?? ''}
                  onChange={(value) => setProduct({ ...product, barcode: value })}
                />
              </div>
            </Surface>

            <Surface className="product-form-section">
              <div className="form-section-heading">
                <span className="form-section-heading__step">02</span>
                <div>
                  <h2>Pricing</h2>
                  <p>Cost is private and supports the backend gross-profit estimate.</p>
                </div>
              </div>
              <div className="form-grid">
                <NumberField
                  id="cost-price"
                  label="Cost price (₦)"
                  value={product.costPrice}
                  onChange={(value) => setProduct({ ...product, costPrice: value })}
                />
                <NumberField
                  id="selling-price"
                  label="Selling price (₦)"
                  value={product.sellingPrice}
                  onChange={(value) => setProduct({ ...product, sellingPrice: value ?? 0 })}
                  required
                />
                <NumberField
                  id="discount-price"
                  label="Discount price (₦)"
                  value={product.discountPrice}
                  onChange={(value) => setProduct({ ...product, discountPrice: value })}
                  hint="Leave blank when there is no offer price."
                />
              </div>
            </Surface>

            <Surface className="product-form-section">
              <div className="form-section-heading">
                <span className="form-section-heading__step">03</span>
                <div>
                  <h2>Stock</h2>
                  <p>Record the current quantity and the point that needs attention.</p>
                </div>
              </div>
              <div className="form-grid">
                <NumberField
                  id="product-quantity"
                  label="Quantity"
                  value={product.quantity}
                  onChange={(value) => setProduct({ ...product, quantity: value ?? 0 })}
                  required
                />
                <TextField
                  id="product-unit"
                  label="Unit"
                  value={product.unit}
                  onChange={(value) => setProduct({ ...product, unit: value })}
                  required
                  hint="For example: piece, pack, bottle or kg."
                />
                <NumberField
                  id="stock-threshold"
                  label="Low-stock threshold"
                  value={product.stockThreshold}
                  onChange={(value) => setProduct({ ...product, stockThreshold: value ?? 0 })}
                  required
                />
                <TextField
                  id="product-location"
                  label="Location"
                  value={product.location ?? ''}
                  onChange={(value) => setProduct({ ...product, location: value })}
                  hint="Optional shelf, store or warehouse reference."
                />
              </div>
            </Surface>
          </div>

          <aside className="product-form-aside">
            <Surface className="product-form-section product-status-card">
              <div className="form-section-heading">
                <div>
                  <h2>Availability</h2>
                  <p>Control whether this product is active in your records.</p>
                </div>
              </div>
              <label className="product-active-toggle">
                <input
                  type="checkbox"
                  checked={product.isActive}
                  onChange={(event) => setProduct({ ...product, isActive: event.target.checked })}
                />
                <span aria-hidden="true" />
                <span>
                  <strong>{product.isActive ? 'Active product' : 'Inactive product'}</strong>
                  <small>
                    {product.isActive
                      ? 'Available for current workflows'
                      : 'Retained but marked inactive'}
                  </small>
                </span>
              </label>
            </Surface>

            {isEditing && can(role, 'product:delete') && (
              <Surface className="product-danger-zone">
                <h2>Delete product</h2>
                <p>Deletion may affect references to this product in historical records.</p>
                {confirmDelete ? (
                  <div className="product-delete-confirm" role="alert">
                    <strong>Delete “{product.name}” permanently?</strong>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setConfirmDelete(false)}
                        disabled={deleteState.isLoading}
                      >
                        Keep product
                      </Button>
                      <Button
                        type="button"
                        className="product-delete-button"
                        onClick={() => void handleDelete()}
                        loading={deleteState.isLoading}
                        icon={<Trash2 aria-hidden="true" size={17} />}
                      >
                        Yes, delete product
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    className="product-delete-trigger"
                    onClick={() => setConfirmDelete(true)}
                    icon={<Trash2 aria-hidden="true" size={17} />}
                  >
                    Delete product
                  </Button>
                )}
              </Surface>
            )}
          </aside>
        </div>

        <div className="product-form-actions">
          <span>Review required fields before saving.</span>
          <div>
            <Button asChild variant="ghost">
              <Link to="/products">Cancel</Link>
            </Button>
            <Button
              type="submit"
              loading={createState.isLoading || updateState.isLoading}
              icon={<PackageCheck aria-hidden="true" size={18} />}
            >
              {isEditing ? 'Save changes' : 'Save product'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  required = false,
  hint,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <FormField htmlFor={id} label={label} required={required} hint={hint}>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        autoComplete={autoComplete}
      />
    </FormField>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  required = false,
  hint,
}: {
  id: string;
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <FormField htmlFor={id} label={label} required={required} hint={hint}>
      <Input
        id={id}
        type="number"
        min="0"
        step="0.01"
        value={value ?? ''}
        onChange={(event) =>
          onChange(event.target.value === '' ? null : Number(event.target.value))
        }
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        inputMode="decimal"
      />
    </FormField>
  );
}

function ProductFormSkeleton() {
  return (
    <div
      className="products-page product-form-skeleton"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--briefing" />
      <div className="skeleton skeleton--briefing" />
    </div>
  );
}

function recordingToDataUrl(recording: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result)));
    reader.addEventListener('error', () => reject(reader.error));
    reader.readAsDataURL(recording);
  });
}

function formatRecordingDuration(durationSeconds: number) {
  const minutes = Math.floor(durationSeconds / 60);
  return `${minutes}:${(durationSeconds % 60).toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number) {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result)));
    reader.addEventListener('error', () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}
