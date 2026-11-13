import { Alert, Button, FormField, Input, PageHeader, Select, Surface, Textarea } from '@trada/ui';
import { ArrowLeft, Minus, Plus, ReceiptText, ShoppingCart, Trash2 } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { formatNaira } from '../../lib/formatters';
import { readApiError } from '../../lib/apiError';
import {
  useCreateSaleMutation,
  useGetProductsQuery,
  type PaymentMethod,
  type Product,
} from '../../lib/api';

type CartItem = { product: Product; quantity: number; unitPrice: number; discountAmount: number };

export function SaleCheckoutPage() {
  const navigate = useNavigate();
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
      const sale = await createSale({
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
