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
import { AlertTriangle, ArrowLeft, Boxes, PackageCheck, Trash2 } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  type ProductInput,
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

export function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');
  const {
    data: existing,
    isLoading: isLoadingProduct,
    isError: loadFailed,
    refetch,
  } = useGetProductQuery(id ?? '', { skip: !id });
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();
  const [deleteProduct, deleteState] = useDeleteProductMutation();
  const [product, setProduct] = useState<ProductInput>(emptyProduct);
  const [error, setError] = useState<string>();
  const [confirmDelete, setConfirmDelete] = useState(false);

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
