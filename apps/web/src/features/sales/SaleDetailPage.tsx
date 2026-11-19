import { Alert, Badge, Button, EmptyState, PageHeader, Surface } from '@trada/ui';
import { ArrowLeft, Ban, ReceiptText } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import { useCancelSaleMutation, useGetSaleQuery } from '../../lib/api';
import { readApiError } from '../../lib/apiError';
import { formatNaira, formatStatus } from '../../lib/formatters';
import { BackLink } from '../../components/BackLink';

export function SaleDetailPage() {
  const { id = '' } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');
  const { data: sale, isLoading, isError, refetch } = useGetSaleQuery(id);
  const [cancelSale, cancelState] = useCancelSaleMutation();
  const [error, setError] = useState<string>();
  const [confirmCancel, setConfirmCancel] = useState(false);

  async function handleCancel() {
    setError(undefined);
    try {
      await cancelSale(id).unwrap();
      setConfirmCancel(false);
    } catch (reason) {
      setError(readApiError(reason, 'We couldn’t cancel this sale. Try again.'));
    }
  }

  if (isLoading)
    return (
      <div className="sales-page">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--briefing" />
      </div>
    );
  if (isError || !sale)
    return (
      <EmptyState
        className="products-feedback"
        icon={<ReceiptText aria-hidden="true" size={28} />}
        title="We couldn’t load this sale"
        description="The receipt may be unavailable, or the connection may have failed."
        action={<Button onClick={() => void refetch()}>Try again</Button>}
      />
    );

  const canCancel = can(role, 'sale:cancel') && sale.status === 'completed';
  return (
    <div className="sales-page sale-detail-page">
      <BackLink to="/sales">Sales</BackLink>
      <PageHeader
        eyebrow="Sale receipt"
        title={sale.receiptNumber}
        description={`${formatDateTime(sale.createdAt)} · ${sale.customerName || 'Walk-in customer'}`}
        actions={
          <div className="sale-detail-status">
            <Badge tone={sale.status === 'completed' ? 'success' : 'warning'}>
              {formatStatus(sale.status)}
            </Badge>
            <Badge tone={sale.paymentStatus === 'paid' ? 'success' : 'warning'}>
              {formatStatus(sale.paymentStatus)}
            </Badge>
          </div>
        }
      />
      {error && <Alert tone="error">{error}</Alert>}

      <div className="sale-detail-grid">
        <Surface className="sale-detail-items">
          <div className="form-section-heading">
            <div>
              <h2>Items</h2>
              <p>
                {sale.items.length} {sale.items.length === 1 ? 'line item' : 'line items'}
              </p>
            </div>
          </div>
          {sale.items.map((item) => (
            <article className="sale-detail-item" key={item.id}>
              <div>
                <strong>{item.productName}</strong>
                <small>
                  {item.sku || 'No SKU'} · {item.quantity} × {formatNaira.format(item.unitPrice)}
                </small>
              </div>
              <strong>{formatNaira.format(item.total)}</strong>
            </article>
          ))}
        </Surface>
        <div className="sale-detail-side">
          <Surface className="sale-detail-card">
            <h2>Payment summary</h2>
            <DetailRow label="Booked revenue" value={sale.totalAmount} />
            <DetailRow label="Amount received" value={sale.amountPaid} />
            <DetailRow label="Balance due" value={sale.balanceDue} warning={sale.balanceDue > 0} />
            <div className="sale-detail-method">
              <span>Method</span>
              <strong>{formatStatus(sale.paymentMethod)}</strong>
            </div>
          </Surface>
          {(sale.customerPhone || sale.customerEmail || sale.notes) && (
            <Surface className="sale-detail-card">
              <h2>Customer and notes</h2>
              {sale.customerPhone && <p>{sale.customerPhone}</p>}
              {sale.customerEmail && <p>{sale.customerEmail}</p>}
              {sale.notes && <p className="sale-notes">{sale.notes}</p>}
            </Surface>
          )}
        </div>
      </div>

      <Surface className="sale-detail-actions">
        <div>
          <strong>Sale controls</strong>
          <p>
            Cancelling restores inventory. It does not itself prove money was returned to the
            customer.
          </p>
        </div>
        {canCancel &&
          (confirmCancel ? (
            <div className="sale-cancel-confirm" role="alert">
              <strong>Cancel {sale.receiptNumber} and restore its inventory?</strong>
              <span>Handle any customer refund separately.</span>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setConfirmCancel(false)}
                  disabled={cancelState.isLoading}
                >
                  Keep sale
                </Button>
                <Button
                  type="button"
                  className="sale-cancel-button"
                  loading={cancelState.isLoading}
                  onClick={() => void handleCancel()}
                  icon={<Ban aria-hidden="true" size={17} />}
                >
                  Yes, cancel sale
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              className="sale-cancel-trigger"
              onClick={() => setConfirmCancel(true)}
              icon={<Ban aria-hidden="true" size={17} />}
            >
              Cancel sale and restock
            </Button>
          ))}
      </Surface>
    </div>
  );
}

function DetailRow({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: number;
  warning?: boolean;
}) {
  return (
    <div className={warning ? 'detail-row is-warning' : 'detail-row'}>
      <span>{label}</span>
      <strong>{formatNaira.format(value)}</strong>
    </div>
  );
}
function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(value),
  );
}
