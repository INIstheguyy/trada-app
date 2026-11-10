import { Badge, Button, Surface } from '@trada/ui';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CircleDollarSign,
  Plus,
  ReceiptText,
  Search,
  TrendingUp,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { formatNaira } from '../../lib/formatters';
import { useGetSalesAnalyticsQuery, useGetSalesQuery, type PaymentStatus } from '../../lib/api';

export function SalesListPage() {
  const [draftSearch, setDraftSearch] = useState('');
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const query = {
    search,
    paymentStatus,
    startDate,
    endDate,
    page,
    limit: 10,
    sortBy: 'createdAt' as const,
    sortOrder: 'DESC' as const,
  };
  const { data, isLoading, isError, refetch } = useGetSalesQuery(query);
  const { data: analytics } = useGetSalesAnalyticsQuery({ startDate, endDate });

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(draftSearch.trim());
  }

  return (
    <div className="sales-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Sales</p>
          <h1>Sales activity</h1>
          <p>Track booked revenue, payments received and customer balances separately.</p>
        </div>
        <Button asChild>
          <Link to="/sales/new">
            <Plus aria-hidden="true" size={18} /> Record sale
          </Link>
        </Button>
      </div>

      <div className="sales-metrics">
        <Metric
          icon={ReceiptText}
          label="Completed sales"
          value={analytics ? String(analytics.totalSalesCount) : '—'}
          note="For the selected period"
        />
        <Metric
          icon={TrendingUp}
          label="Booked revenue"
          value={analytics ? formatNaira.format(analytics.totalRevenue) : '—'}
          note="Not the same as cash received"
        />
        <Metric
          icon={CircleDollarSign}
          label="Gross profit"
          value={analytics ? formatNaira.format(analytics.grossProfit) : '—'}
          note="Based on recorded product costs"
        />
        <Metric
          icon={Banknote}
          label="Unpaid balance"
          value={analytics ? formatNaira.format(analytics.unpaidBalance) : '—'}
          note="Still owed by customers"
          warning={Boolean(analytics?.unpaidBalance)}
        />
      </div>

      <Surface className="sales-panel">
        <form className="sales-filters" onSubmit={handleFilter}>
          <label className="sales-search">
            <Search aria-hidden="true" size={17} />
            <input
              aria-label="Search sales"
              placeholder="Receipt or customer"
              value={draftSearch}
              onChange={(event) => setDraftSearch(event.target.value)}
            />
          </label>
          <select
            aria-label="Payment status"
            value={paymentStatus}
            onChange={(event) => {
              setPaymentStatus(event.target.value as PaymentStatus | '');
              setPage(1);
            }}
          >
            <option value="">All payment statuses</option>
            <option value="paid">Paid</option>
            <option value="partially_paid">Partially paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="refunded">Refunded</option>
          </select>
          <label className="date-filter">
            <span>From</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value);
                setPage(1);
              }}
            />
          </label>
          <label className="date-filter">
            <span>To</span>
            <input
              type="date"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
                setPage(1);
              }}
            />
          </label>
          <button type="submit">Apply</button>
        </form>

        {isLoading ? (
          <div className="product-list-skeleton" aria-busy="true">
            {[1, 2, 3, 4].map((item) => (
              <div className="skeleton" key={item} />
            ))}
          </div>
        ) : isError ? (
          <div className="products-feedback" role="alert">
            <ReceiptText aria-hidden="true" size={28} />
            <h2>We couldn’t load sales</h2>
            <p>Check your connection and try again.</p>
            <Button onClick={() => refetch()}>Try again</Button>
          </div>
        ) : data?.sales.length === 0 ? (
          <div className="products-feedback">
            <ReceiptText aria-hidden="true" size={28} />
            <h2>No sales found</h2>
            <p>Record a sale or change the selected filters.</p>
            <Button asChild>
              <Link to="/sales/new">Record sale</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="sales-table">
              <div className="sales-table__header">
                <span>Receipt / customer</span>
                <span>Total</span>
                <span>Paid</span>
                <span>Balance</span>
                <span>Status</span>
                <span />
              </div>
              {data?.sales.map((sale) => (
                <article className="sales-row" key={sale.id}>
                  <div className="sale-primary">
                    <strong>{sale.receiptNumber}</strong>
                    <small>
                      {sale.customerName || 'Walk-in customer'} · {formatDate(sale.createdAt)}
                    </small>
                  </div>
                  <SaleAmount label="Total" value={sale.totalAmount} />
                  <SaleAmount label="Paid" value={sale.amountPaid} />
                  <SaleAmount
                    label="Balance"
                    value={sale.balanceDue}
                    warning={sale.balanceDue > 0}
                  />
                  <div className="sale-status">
                    <Badge className={sale.paymentStatus === 'paid' ? '' : 'sd-badge--warning'}>
                      {formatStatus(sale.paymentStatus)}
                    </Badge>
                    <small>{formatStatus(sale.status)}</small>
                  </div>
                  <Link
                    className="product-row-link"
                    to={`/sales/${sale.id}`}
                    aria-label={`View ${sale.receiptNumber}`}
                  >
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </article>
              ))}
            </div>
            {data && data.pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  disabled={!data.pagination.hasPrevPage}
                  onClick={() => setPage((value) => value - 1)}
                >
                  <ArrowLeft aria-hidden="true" size={16} /> Previous
                </button>
                <span>
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={!data.pagination.hasNextPage}
                  onClick={() => setPage((value) => value + 1)}
                >
                  Next <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </Surface>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  note,
  warning = false,
}: {
  icon: typeof ReceiptText;
  label: string;
  value: string;
  note: string;
  warning?: boolean;
}) {
  return (
    <Surface className="sales-metric">
      <span className={warning ? 'sales-metric__icon is-warning' : 'sales-metric__icon'}>
        <Icon aria-hidden="true" size={19} />
      </span>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{note}</small>
    </Surface>
  );
}
function SaleAmount({
  label,
  value,
  warning = false,
}: {
  label: string;
  value: number;
  warning?: boolean;
}) {
  return (
    <div className={warning ? 'sale-amount is-warning' : 'sale-amount'}>
      <small>{label}</small>
      <strong>{formatNaira.format(value)}</strong>
    </div>
  );
}
function formatStatus(value: string) {
  return value.replaceAll('_', ' ').replace(/^./, (letter) => letter.toUpperCase());
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(value));
}
