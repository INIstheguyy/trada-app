import { Badge, Button, Surface } from '@trada/ui';
import { ArrowLeft, Ban, ReceiptText } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import { formatNaira } from '../../lib/formatters';
import { readApiError } from '../../lib/apiError';
import { useCancelSaleMutation, useGetSaleQuery } from '../../lib/api';

export function SaleDetailPage() {
  const { id = '' } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');
  const { data: sale, isLoading, isError, refetch } = useGetSaleQuery(id);
  const [cancelSale, cancelState] = useCancelSaleMutation();
  const [error, setError] = useState<string>();

  async function handleCancel() {
    if (
      !window.confirm(
        'Cancel this sale and restore its inventory? Confirm the refund separately with the customer.',
      )
    )
      return;
    setError(undefined);
    try {
      await cancelSale(id).unwrap();
    } catch (reason) {
      setError(readApiError(reason, 'We couldn’t cancel this sale. Try again.'));
    }
  }

  if (isLoading)
    return (
      <div className="sales-page">
        <div className="skeleton skeleton--briefing" />
      </div>
    );
  if (isError || !sale)
    return (
      <div className="products-feedback" role="alert">
        <ReceiptText aria-hidden="true" size={28} />
        <h1>We couldn’t load this sale</h1>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );

  const canCancel = can(role, 'sale:cancel') && sale.status === 'completed';
  return (
    <div className="sales-page sale-detail-page">
      <div className="page-heading">
        <div>
          <Link className="back-link" to="/sales">
            <ArrowLeft aria-hidden="true" size={16} /> Sales
          </Link>
          <h1>{sale.receiptNumber}</h1>
          <p>
            {formatDateTime(sale.createdAt)} · {sale.customerName || 'Walk-in customer'}
          </p>
        </div>
        <div className="sale-detail-status">
          <Badge className={sale.status === 'completed' ? '' : 'sd-badge--warning'}>
            {formatStatus(sale.status)}
          </Badge>
          <Badge className={sale.paymentStatus === 'paid' ? '' : 'sd-badge--warning'}>
            {formatStatus(sale.paymentStatus)}
          </Badge>
        </div>
      </div>
      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}
      <div className="sale-detail-grid">
        <Surface className="sale-detail-items">
          <div className="form-section-heading">
            <h2>Items</h2>
            <p>
              {sale.items.length} {sale.items.length === 1 ? 'line item' : 'line items'}
            </p>
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
      <div className="sale-detail-actions">
        <p>
          Cancelling restores inventory. A refunded status does not itself prove money was returned.
        </p>
        {canCancel && (
          <Button
            type="button"
            variant="ghost"
            loading={cancelState.isLoading}
            onClick={handleCancel}
            icon={<Ban aria-hidden="true" size={17} />}
          >
            Cancel sale and restock
          </Button>
        )}
      </div>
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
function formatStatus(value: string) {
  return value.replaceAll('_', ' ').replace(/^./, (letter) => letter.toUpperCase());
}
function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(value),
  );
}
