import { Button, Surface } from '@trada/ui';
import { ArrowLeft, PackageCheck, Trash2 } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import { readApiError } from '../../lib/apiError';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
  type ProductInput,
} from '../../lib/api';

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
  } = useGetProductQuery(id ?? '', { skip: !id });
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();
  const [deleteProduct, deleteState] = useDeleteProductMutation();
  const [product, setProduct] = useState<ProductInput>(emptyProduct);
  const [error, setError] = useState<string>();

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
    if (!id || !window.confirm('Delete this product? This action may affect historical records.'))
      return;
    setError(undefined);
    try {
      await deleteProduct(id).unwrap();
      navigate('/products', { replace: true });
    } catch (reason) {
      setError(readApiError(reason, 'We couldn’t delete this product. Try again.'));
    }
  }

  if (isEditing && isLoadingProduct)
    return (
      <div className="products-page">
        <div className="skeleton skeleton--briefing" />
      </div>
    );
  if (isEditing && loadFailed)
    return (
      <div className="products-feedback" role="alert">
        <h1>We couldn’t load this product</h1>
        <Button asChild>
          <Link to="/products">Back to products</Link>
        </Button>
      </div>
    );

  return (
    <div className="products-page product-form-page">
      <div className="page-heading">
        <div>
          <Link className="back-link" to="/products">
            <ArrowLeft aria-hidden="true" size={16} /> Products
          </Link>
          <h1>{isEditing ? 'Edit product' : 'Add a product'}</h1>
          <p>
            {isEditing
              ? 'Update the product details recorded by your business.'
              : 'Record the critical price and stock information before saving.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}
        <div className="product-form-grid">
          <Surface className="product-form-section product-form-section--main">
            <div className="form-section-heading">
              <h2>Product details</h2>
              <p>How staff will identify this item.</p>
            </div>
            <div className="form-grid">
              <ProductField
                label="Product name"
                value={product.name}
                onChange={(value) => setProduct({ ...product, name: value })}
                required
              />
              <ProductField
                label="Category"
                value={product.category ?? ''}
                onChange={(value) => setProduct({ ...product, category: value })}
              />
              <label className="product-field product-field--wide">
                <span>Description</span>
                <textarea
                  value={product.description ?? ''}
                  onChange={(event) => setProduct({ ...product, description: event.target.value })}
                  rows={3}
                />
              </label>
              <label className="product-field">
                <span>Product type</span>
                <select
                  value={product.type}
                  onChange={(event) =>
                    setProduct({ ...product, type: event.target.value as ProductInput['type'] })
                  }
                >
                  <option value="inventory_based">Inventory based</option>
                  <option value="input_based">Input based / service</option>
                </select>
              </label>
              <label className="product-field">
                <span>Condition</span>
                <select
                  value={product.condition}
                  onChange={(event) =>
                    setProduct({
                      ...product,
                      condition: event.target.value as ProductInput['condition'],
                    })
                  }
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="foreign_used">Foreign used</option>
                </select>
              </label>
              <ProductField
                label="SKU"
                value={product.sku ?? ''}
                onChange={(value) => setProduct({ ...product, sku: value })}
              />
              <ProductField
                label="Barcode"
                value={product.barcode ?? ''}
                onChange={(value) => setProduct({ ...product, barcode: value })}
              />
            </div>
          </Surface>

          <Surface className="product-form-section">
            <div className="form-section-heading">
              <h2>Pricing</h2>
              <p>Cost is private and used for gross-profit estimates.</p>
            </div>
            <div className="form-grid">
              <NumberField
                label="Cost price (₦)"
                value={product.costPrice}
                onChange={(value) => setProduct({ ...product, costPrice: value })}
              />
              <NumberField
                label="Selling price (₦)"
                value={product.sellingPrice}
                onChange={(value) => setProduct({ ...product, sellingPrice: value ?? 0 })}
                required
              />
              <NumberField
                label="Discount price (₦)"
                value={product.discountPrice}
                onChange={(value) => setProduct({ ...product, discountPrice: value })}
              />
            </div>
          </Surface>

          <Surface className="product-form-section">
            <div className="form-section-heading">
              <h2>Stock</h2>
              <p>Opening quantity and when to raise an alert.</p>
            </div>
            <div className="form-grid">
              <NumberField
                label="Quantity"
                value={product.quantity}
                onChange={(value) => setProduct({ ...product, quantity: value ?? 0 })}
                required
              />
              <ProductField
                label="Unit"
                value={product.unit}
                onChange={(value) => setProduct({ ...product, unit: value })}
                required
              />
              <NumberField
                label="Low-stock threshold"
                value={product.stockThreshold}
                onChange={(value) => setProduct({ ...product, stockThreshold: value ?? 0 })}
                required
              />
              <ProductField
                label="Location"
                value={product.location ?? ''}
                onChange={(value) => setProduct({ ...product, location: value })}
              />
            </div>
          </Surface>
        </div>

        <div className="product-form-actions">
          {isEditing && can(role, 'product:delete') && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              loading={deleteState.isLoading}
              icon={<Trash2 aria-hidden="true" size={17} />}
            >
              Delete product
            </Button>
          )}
          <span className="product-form-actions__spacer" />
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
      </form>
    </div>
  );
}

function ProductField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="product-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  required?: boolean;
}) {
  return (
    <label className="product-field">
      <span>{label}</span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value ?? ''}
        onChange={(event) =>
          onChange(event.target.value === '' ? null : Number(event.target.value))
        }
        required={required}
      />
    </label>
  );
}
