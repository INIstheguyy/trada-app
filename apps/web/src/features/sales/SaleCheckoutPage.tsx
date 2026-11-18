import { Alert, Button, FormField, Input, PageHeader, Select, Surface, Textarea } from '@trada/ui';
import {
  ArrowLeft,
  FilePenLine,
  Mic,
  Minus,
  Plus,
  ReceiptText,
  ShoppingCart,
  Square,
  Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { formatNaira } from '../../lib/formatters';
import { readApiError } from '../../lib/apiError';
import {
  useCreateSaleMutation,
  useCreateVoiceSaleDraftMutation,
  useGetProductsQuery,
  type PaymentMethod,
  type Product,
  type VoiceSaleDraft,
  type VoiceSaleDraftRequest,
} from '../../lib/api';

type CartItem = { product: Product; quantity: number; unitPrice: number; discountAmount: number };
type VoiceRecordingPreview = {
  blob: Blob;
  durationSeconds: number;
  mimeType: string;
  url: string;
};
const maxAudioBytes = 10 * 1024 * 1024;
const maxAudioDurationSeconds = 60;

export function SaleCheckoutPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: productsFailed,
    refetch: refetchProducts,
  } = useGetProductsQuery({
    isActive: true,
    page: 1,
    limit: 100,
    sortBy: 'name',
    sortOrder: 'ASC',
  });
  const [createSale, { isLoading }] = useCreateSaleMutation();
  const [createVoiceSaleDraft, voiceDraftState] = useCreateVoiceSaleDraftMutation();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [amountPaid, setAmountPaid] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string>();
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceDraft, setVoiceDraft] = useState<VoiceSaleDraft>();
  const [voiceError, setVoiceError] = useState<string>();
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingElapsedSeconds, setRecordingElapsedSeconds] = useState(0);
  const [audioPreview, setAudioPreview] = useState<VoiceRecordingPreview>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordedAudioChunksRef = useRef<Blob[]>([]);
  const recordingStartedAtRef = useRef<number | null>(null);
  const audioPreviewUrlRef = useRef<string | null>(null);
  const saleIdempotencyKeyRef = useRef<string | undefined>(undefined);
  const voiceEntryRef = useRef<HTMLElement | null>(null);

  useEffect(
    () => () => {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioPreviewUrlRef.current) URL.revokeObjectURL(audioPreviewUrlRef.current);
    },
    [],
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
    if (searchParams.get('ai') !== 'voice') return;
    const frame = window.requestAnimationFrame(() => {
      voiceEntryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      voiceEntryRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [searchParams]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.unitPrice * item.quantity - item.discountAmount,
        0,
      ),
    [items],
  );
  const totalAmount = Math.max(0, subtotal - discountAmount + taxAmount);
  const balanceDue = Math.max(0, totalAmount - amountPaid);
  const draftItems =
    voiceDraft?.draft?.items ?? voiceDraft?.sale?.items ?? voiceDraft?.extractedFields?.items ?? [];
  const draftItemsMissingCheckoutData = draftItems.filter(
    (item) =>
      !item.productId ||
      item.quantity == null ||
      item.quantity <= 0 ||
      item.unitPrice == null ||
      item.unitPrice < 0 ||
      !productsData?.products.some((product) => product.id === item.productId),
  );
  const draftNeedsManualReview =
    Boolean(voiceDraft?.ambiguousFields?.length) ||
    voiceDraft?.confidence?.overall != null && voiceDraft.confidence.overall < 0.85;
  const canApplyVoiceDraft =
    Boolean(voiceDraft) &&
    items.length === 0 &&
    draftItems.length > 0 &&
    draftItemsMissingCheckoutData.length === 0 &&
    !draftNeedsManualReview;

  function addProduct() {
    const product = productsData?.products.find((candidate) => candidate.id === selectedProductId);
    if (!product) return;
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing)
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      return [
        ...current,
        {
          product,
          quantity: 1,
          unitPrice: product.discountPrice ?? product.sellingPrice,
          discountAmount: 0,
        },
      ];
    });
    setSelectedProductId('');
  }

  function updateItem(id: string, changes: Partial<Omit<CartItem, 'product'>>) {
    setItems((current) =>
      current.map((item) => (item.product.id === id ? { ...item, ...changes } : item)),
    );
  }

  async function generateVoiceDraft(input: VoiceSaleDraftRequest) {
    setVoiceError(undefined);
    setVoiceDraft(undefined);
    try {
      const draft = await createVoiceSaleDraft(input).unwrap();
      setVoiceDraft(draft);
    } catch (reason) {
      setVoiceError(
        readApiError(
          reason,
          'We couldn’t prepare a sale draft. You can continue with manual checkout.',
        ),
      );
    }
  }

  async function startVoiceRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setVoiceError(
        'Voice recording is not supported in this browser. Type the sale description instead.',
      );
      return;
    }

    setVoiceError(undefined);
    setVoiceDraft(undefined);
    discardAudioPreview();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredMimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType: preferredMimeType });
      recordedAudioChunksRef.current = [];
      recordingStartedAtRef.current = Date.now();
      setRecordingElapsedSeconds(0);
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = recorder;

      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) recordedAudioChunksRef.current.push(event.data);
      });
      recorder.addEventListener('stop', () => {
        const mimeType = recorder.mimeType || preferredMimeType;
        const recording = new Blob(recordedAudioChunksRef.current, { type: mimeType });
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
            'No audio was captured. Try recording again or type the sale description instead.',
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
        'We could not access your microphone. Allow microphone access or type the sale description instead.',
      );
    }
  }

  function stopVoiceRecording() {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
  }

  function discardAudioPreview() {
    if (audioPreviewUrlRef.current) URL.revokeObjectURL(audioPreviewUrlRef.current);
    audioPreviewUrlRef.current = null;
    setAudioPreview(undefined);
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
    const text = voiceTranscript.trim();
    if (!text) {
      setVoiceError('Enter a sale description to prepare a typed draft.');
      return;
    }
    void generateVoiceDraft({ text });
  }

  function applyVoiceDraft() {
    if (!voiceDraft || !productsData || !canApplyVoiceDraft) return;

    const sale = voiceDraft.draft ?? voiceDraft.sale;
    const extracted = voiceDraft.extractedFields;
    const draftedItems: CartItem[] = draftItems.flatMap((item) => {
      const product = productsData.products.find((candidate) => candidate.id === item.productId);
      if (!product || item.quantity == null || item.unitPrice == null) return [];
      return [
        {
          product,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discountAmount: item.discountAmount ?? 0,
        },
      ];
    });

    setItems(draftedItems);
    setCustomerName(sale?.customerName ?? extracted?.customerName ?? '');
    setCustomerPhone(sale?.customerPhone ?? extracted?.customerPhone ?? '');
    setCustomerEmail(sale?.customerEmail ?? extracted?.customerEmail ?? '');
    setPaymentMethod(sale?.paymentMethod ?? extracted?.paymentMethod ?? 'cash');
    setAmountPaid(sale?.amountPaid ?? extracted?.amountPaid ?? 0);
    setDiscountAmount(sale?.discountAmount ?? extracted?.discountAmount ?? 0);
    setTaxAmount(sale?.taxAmount ?? extracted?.taxAmount ?? 0);
    setNotes(sale?.notes ?? '');
    saleIdempotencyKeyRef.current = voiceDraft.draft?.idempotencyKey;
    setVoiceDraft(undefined);
    setVoiceError(undefined);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    if (items.length === 0) {
      setError('Add at least one product to this sale.');
      return;
    }
    const unavailable = items.find(
      (item) => item.product.type === 'inventory_based' && item.quantity > item.product.quantity,
    );
    if (unavailable) {
      setError(
        `${unavailable.product.name} has only ${unavailable.product.quantity} ${unavailable.product.unit} available.`,
      );
      return;
    }
    if (amountPaid > totalAmount) {
      setError('Amount paid cannot be more than the sale total.');
      return;
    }

    try {
      const idempotencyKey =
        saleIdempotencyKeyRef.current ??
        (typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `sale-${Date.now()}-${Math.random().toString(36).slice(2)}`);
      saleIdempotencyKeyRef.current = idempotencyKey;
      const sale = await createSale({
        idempotencyKey,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        customerEmail: customerEmail.trim() || undefined,
        paymentMethod,
        amountPaid,
        discountAmount,
        taxAmount,
        notes: notes.trim() || undefined,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discountAmount: item.discountAmount,
        })),
      }).unwrap();
      saleIdempotencyKeyRef.current = undefined;
      navigate(`/sales/${sale.id}`, { replace: true });
    } catch (reason) {
      setError(
        readApiError(reason, 'We couldn’t record this sale. Review the details and try again.'),
      );
    }
  }

  return (
    <div className="sales-page checkout-page">
      <Link className="back-link" to="/sales">
        <ArrowLeft aria-hidden="true" size={16} /> Sales
      </Link>
      <PageHeader
        eyebrow="New receipt"
        title="Record a sale"
        description="Build the cart, confirm payment received and review any outstanding balance before saving."
      />
      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-main">
          {error && <Alert tone="error">{error}</Alert>}
          <section
            className="voice-entry-target"
            ref={voiceEntryRef}
            tabIndex={-1}
            aria-label="AI voice sale capture"
          >
            <Surface className="checkout-section voice-draft-entry">
            <div className="form-section-heading">
              <h2>Record sale by voice</h2>
              <p>
                Record the sale in your own words. Trada prepares a draft; nothing is recorded yet.
              </p>
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
                {isRecordingVoice ? 'Stop and prepare draft' : 'Start voice recording'}
              </Button>
              <small>
                {isRecordingVoice
                  ? `Recording ${formatRecordingDuration(recordingElapsedSeconds)} â€” tap stop when you have finished speaking.`
                  : 'AI drafts do not create a sale. Review before using any detail below.'}
              </small>
            </div>
            {audioPreview && (
              <div className="voice-recording-preview" aria-live="polite">
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
              <summary>Canâ€™t record? Type a sale description instead</summary>
              <FormField
                htmlFor="voice-sale-transcript"
                label="Sale description"
                hint="For example: Musa bought 3 bags of rice and paid 120k by transfer."
              >
                <Textarea
                  id="voice-sale-transcript"
                  rows={3}
                  value={voiceTranscript}
                  onChange={(event) => setVoiceTranscript(event.target.value)}
                  placeholder="Describe the items, payment and customer details"
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
            </Surface>
          </section>

          {voiceDraft && (
            <Surface className="checkout-section voice-draft-review" aria-live="polite">
              <div className="form-section-heading">
                <h2>Review AI draft</h2>
                <p>Confirm every extracted detail before placing it in checkout.</p>
              </div>
              <Alert tone="warning">
                No sale has been recorded. Use the normal confirmation button after reviewing the
                checkout.
              </Alert>
              <div className="voice-draft-review__transcript">
                <span>Transcript</span>
                <p>{voiceDraft.transcript}</p>
              </div>
              {voiceDraft.confidence?.overall != null && voiceDraft.confidence.overall < 0.85 && (
                <Alert tone="warning">
                  AI confidence is {Math.round(voiceDraft.confidence.overall * 100)}%. Check every
                  detail before using this draft.
                </Alert>
              )}
              {voiceDraft.ambiguousFields?.length ? (
                <Alert tone="warning">
                  Needs your confirmation: {voiceDraft.ambiguousFields.join(', ')}.
                </Alert>
              ) : null}
              {draftItems.length > 0 ? (
                <ul className="voice-draft-review__items" aria-label="AI-drafted sale items">
                  {draftItems.map((item, index) => (
                    <li key={`${item.productId ?? item.productName ?? 'item'}-${index}`}>
                      <strong>{item.productName ?? 'Unmatched product'}</strong>
                      <span>
                        {item.quantity ?? '—'} ×{' '}
                        {item.unitPrice == null
                          ? 'price needed'
                          : formatNaira.format(item.unitPrice)}
                      </span>
                      {item.candidateMatches?.length ? (
                        <small>
                          Alternatives: {item.candidateMatches.map((candidate) => candidate.productName).join(', ')}.
                          Review these against the recognised primary product before continuing.
                        </small>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <Alert tone="warning">
                  No sale items were extracted. Add products manually below.
                </Alert>
              )}
              {draftItemsMissingCheckoutData.length > 0 && (
                <Alert tone="warning">
                  Some draft items are missing a product match, quantity or price in your current
                  catalog. Add or correct them manually.
                </Alert>
              )}
              {draftNeedsManualReview && (
                <Alert tone="warning">
                  This draft needs manual checkout review before it can be recorded. Add the
                  verified items below instead of applying the draft automatically.
                </Alert>
              )}
              {items.length > 0 && (
                <Alert tone="info">
                  Your current cart is unchanged. Clear or finish it before applying a voice draft.
                </Alert>
              )}
              <div className="voice-draft-review__actions">
                <Button type="button" onClick={applyVoiceDraft} disabled={!canApplyVoiceDraft}>
                  Use matching details in checkout
                </Button>
                <Button type="button" variant="ghost" onClick={() => setVoiceDraft(undefined)}>
                  Discard draft
                </Button>
              </div>
            </Surface>
          )}
          <Surface className="checkout-section">
            <div className="form-section-heading">
              <h2>Products</h2>
              <p>Stock is deducted only after the backend confirms the sale.</p>
            </div>
            {productsFailed && (
              <Alert tone="warning">
                Products could not be loaded.{' '}
                <button
                  className="text-action"
                  type="button"
                  onClick={() => void refetchProducts()}
                >
                  Try again
                </button>
              </Alert>
            )}
            <div className="product-picker">
              <Select
                aria-label="Choose product"
                value={selectedProductId}
                onChange={(event) => setSelectedProductId(event.target.value)}
                disabled={isLoadingProducts}
              >
                <option value="">
                  {isLoadingProducts ? 'Loading products…' : 'Choose a product'}
                </option>
                {productsData?.products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                    disabled={product.type === 'inventory_based' && product.quantity <= 0}
                  >
                    {product.name} · {formatNaira.format(product.sellingPrice)} · {product.quantity}{' '}
                    {product.unit}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                variant="secondary"
                onClick={addProduct}
                disabled={!selectedProductId}
                icon={<Plus aria-hidden="true" size={17} />}
              >
                Add
              </Button>
            </div>
            {items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingCart aria-hidden="true" size={25} />
                <p>No products added yet.</p>
              </div>
            ) : (
              <div className="cart-items">
                {items.map((item) => (
                  <article className="cart-item" key={item.product.id}>
                    <div className="cart-item__name">
                      <strong>{item.product.name}</strong>
                      <small>
                        {item.product.quantity} {item.product.unit} available
                      </small>
                    </div>
                    <label>
                      <span>Qty</span>
                      <div className="quantity-control">
                        <button
                          type="button"
                          aria-label={`Reduce ${item.product.name}`}
                          onClick={() =>
                            updateItem(item.product.id, {
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          }
                        >
                          <Minus aria-hidden="true" size={14} />
                        </button>
                        <input
                          aria-label={`${item.product.name} quantity`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            updateItem(item.product.id, {
                              quantity: Math.max(1, Number(event.target.value)),
                            })
                          }
                        />
                        <button
                          type="button"
                          aria-label={`Increase ${item.product.name}`}
                          onClick={() =>
                            updateItem(item.product.id, { quantity: item.quantity + 1 })
                          }
                        >
                          <Plus aria-hidden="true" size={14} />
                        </button>
                      </div>
                    </label>
                    <label>
                      <span>Unit price</span>
                      <input
                        aria-label={`${item.product.name} unit price`}
                        type="number"
                        min="0"
                        value={item.unitPrice}
                        onChange={(event) =>
                          updateItem(item.product.id, { unitPrice: Number(event.target.value) })
                        }
                      />
                    </label>
                    <label>
                      <span>Item discount</span>
                      <input
                        aria-label={`${item.product.name} item discount`}
                        type="number"
                        min="0"
                        value={item.discountAmount}
                        onChange={(event) =>
                          updateItem(item.product.id, {
                            discountAmount: Number(event.target.value),
                          })
                        }
                      />
                    </label>
                    <strong className="cart-item__total">
                      {formatNaira.format(item.unitPrice * item.quantity - item.discountAmount)}
                    </strong>
                    <button
                      className="cart-remove"
                      type="button"
                      onClick={() =>
                        setItems((current) =>
                          current.filter((candidate) => candidate.product.id !== item.product.id),
                        )
                      }
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 aria-hidden="true" size={16} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </Surface>

          <Surface className="checkout-section">
            <div className="form-section-heading">
              <h2>Customer</h2>
              <p>Optional for walk-in sales; required operationally for credit follow-up.</p>
            </div>
            <div className="form-grid">
              <CheckoutField
                label="Customer name"
                value={customerName}
                onChange={setCustomerName}
              />
              <CheckoutField
                label="Phone number"
                value={customerPhone}
                onChange={setCustomerPhone}
                type="tel"
              />
              <CheckoutField
                label="Email"
                value={customerEmail}
                onChange={setCustomerEmail}
                type="email"
              />
              <FormField className="product-form-field--wide" htmlFor="sale-notes" label="Notes">
                <Textarea
                  id="sale-notes"
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </FormField>
            </div>
          </Surface>
        </div>

        <aside className="checkout-summary">
          <Surface className="checkout-section">
            <div className="form-section-heading">
              <h2>Payment</h2>
              <p>Revenue and money received are recorded separately.</p>
            </div>
            <div className="checkout-payment">
              <FormField htmlFor="payment-method" label="Payment method" required>
                <Select
                  id="payment-method"
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                >
                  <option value="cash">Cash</option>
                  <option value="pos">POS</option>
                  <option value="transfer">Transfer</option>
                  <option value="credit">Credit</option>
                  <option value="split">Split</option>
                </Select>
              </FormField>
              <FormField
                htmlFor="amount-paid"
                label="Amount received"
                required
                hint="Record only money already received."
              >
                <Input
                  id="amount-paid"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amountPaid}
                  onChange={(event) => setAmountPaid(Number(event.target.value))}
                  aria-describedby="amount-paid-hint"
                />
              </FormField>
              <button
                className="text-action"
                type="button"
                onClick={() => setAmountPaid(totalAmount)}
              >
                Mark fully paid
              </button>
              <FormField htmlFor="sale-discount" label="Sale discount">
                <Input
                  id="sale-discount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={discountAmount}
                  onChange={(event) => setDiscountAmount(Number(event.target.value))}
                />
              </FormField>
              <FormField htmlFor="sale-tax" label="Tax">
                <Input
                  id="sale-tax"
                  type="number"
                  min="0"
                  step="0.01"
                  value={taxAmount}
                  onChange={(event) => setTaxAmount(Number(event.target.value))}
                />
              </FormField>
            </div>
          </Surface>
          <Surface className="sale-totals">
            <div>
              <span>Items subtotal</span>
              <strong>{formatNaira.format(subtotal)}</strong>
            </div>
            <div>
              <span>Sale discount</span>
              <strong>−{formatNaira.format(discountAmount)}</strong>
            </div>
            <div>
              <span>Tax</span>
              <strong>{formatNaira.format(taxAmount)}</strong>
            </div>
            <div className="sale-totals__total">
              <span>Booked revenue</span>
              <strong>{formatNaira.format(totalAmount)}</strong>
            </div>
            <div>
              <span>Amount received</span>
              <strong>{formatNaira.format(amountPaid)}</strong>
            </div>
            <div className={balanceDue > 0 ? 'sale-totals__balance' : ''}>
              <span>Balance due</span>
              <strong>{formatNaira.format(balanceDue)}</strong>
            </div>
          </Surface>
          <Button
            type="submit"
            className="checkout-submit"
            loading={isLoading}
            icon={<ReceiptText aria-hidden="true" size={18} />}
          >
            Confirm and record sale
          </Button>
          <p className="checkout-note">
            The sale is saved only after the backend confirms stock and the transaction.
          </p>
        </aside>
      </form>
    </div>
  );
}

function CheckoutField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  const id = `customer-${label.toLowerCase().replaceAll(' ', '-')}`;
  return (
    <FormField htmlFor={id} label={label}>
      <Input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </FormField>
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
  const seconds = durationSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatFileSize(bytes: number) {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
