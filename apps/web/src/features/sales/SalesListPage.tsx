import { Alert, Badge, Button, EmptyState, Input, PageHeader, Select, Surface } from '@trada/ui';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Banknote,
  CircleDollarSign,
  Plus,
  ReceiptText,
  RefreshCw,
  Search,
  TrendingUp,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import {
  useGetSalesAnalyticsQuery,
  useGetSalesQuery,
  type PaymentStatus,
  type SaleStatus,
} from '../../lib/api';
import { formatNaira } from '../../lib/formatters';

export function SalesListPage() {
  const [draftSearch, setDraftSearch] = useState('');
  const [search, setSearch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | ''>('');
  const [saleStatus, setSaleStatus] = useState<SaleStatus | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const query = {
    search: search || undefined,
    paymentStatus: paymentStatus || undefined,
    status: saleStatus || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    page,
    limit: 10,
    sortBy: 'createdAt' as const,
    sortOrder: 'DESC' as const,
  };
  const sales = useGetSalesQuery(query);
  const analytics = useGetSalesAnalyticsQuery({
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });
  const hasFilters = Boolean(search || paymentStatus || saleStatus || startDate || endDate);

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(draftSearch.trim());
  }

  function clearFilters() {
    setDraftSearch('');
    setSearch('');
    setPaymentStatus('');
    setSaleStatus('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  }

  function refresh() {
    void sales.refetch();
    void analytics.refetch();
  }

  return (
    <div className="sales-page">
      <PageHeader
        eyebrow="Sales"
        title="Sales activity"
        description="Find receipts and audit booked revenue, money received and outstanding balances separately."
        actions={
          <Button asChild>
            <Link to="/sales/new">
              <Plus aria-hidden="true" size={18} /> Record sale
            </Link>
          </Button>
        }
      />

      {analytics.isError && (
        <Alert tone="warning" icon={<AlertCircle aria-hidden="true" size={18} />}>
          Sales records are available, but summary figures could not be loaded.
        </Alert>
      )}

      <div className="sales-metrics">
        <Metric
          icon={ReceiptText}
          label="Recorded sales"
          value={analytics.data ? String(analytics.data.totalSalesCount) : 'Unavailable'}
          note="For the selected date range"
        />
        <Metric
          icon={TrendingUp}
          label="Booked revenue"
          value={analytics.data ? formatNaira.format(analytics.data.totalRevenue) : 'Unavailable'}
          note="Not the same as cash received"
        />
        <Metric
          icon={CircleDollarSign}
          label="Gross profit"
          value={analytics.data ? formatNaira.format(analytics.data.grossProfit) : 'Unavailable'}
          note="Qualified: missing-cost treatment is undefined"
          qualified
        />
        <Metric
          icon={Banknote}
          label="Unpaid sale balance"
          value={analytics.data ? formatNaira.format(analytics.data.unpaidBalance) : 'Unavailable'}
          note="Not a verified customer debtor ledger"
          qualified
          warning={Boolean(analytics.data?.unpaidBalance)}
        />
      </div>

      <Surface className="sales-panel">
        <form className="sales-filters" onSubmit={handleFilter} role="search">
          <label className="sales-search">
            <Search aria-hidden="true" size={17} />
            <Input
              aria-label="Search sales"
              placeholder="Receipt or customer"
              value={draftSearch}
              onChange={(event) => setDraftSearch(event.target.value)}
            />
          </label>
          <Select
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
          </Select>
          <Select
            aria-label="Sale status"
            value={saleStatus}
            onChange={(event) => {
              setSaleStatus(event.target.value as SaleStatus | '');
              setPage(1);
            }}
          >
            <option value="">All sale statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </Select>
          <label className="date-filter">
            <span>From</span>
            <Input
              aria-label="Sales from date"
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
            <Input
              aria-label="Sales to date"
              type="date"
              min={startDate || undefined}
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
                setPage(1);
              }}
            />
          </label>
          <button type="submit">Apply</button>
        </form>

        <div className="sales-results" role="status">
          <span>
            {sales.data
              ? `${sales.data.pagination.total} ${sales.data.pagination.total === 1 ? 'sale' : 'sales'} found`
              : 'Sales records'}
          </span>
          <div>
            {hasFilters && (
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            )}
            <button type="button" onClick={refresh} aria-label="Refresh sales">
              <RefreshCw
                aria-hidden="true"
                size={16}
                className={sales.isFetching || analytics.isFetching ? 'sd-spin' : ''}
              />
            </button>
          </div>
        </div>

        {sales.isLoading ? (
          <SalesSkeleton />
        ) : sales.isError ? (
          <EmptyState
            className="products-feedback"
            icon={<ReceiptText aria-hidden="true" size={28} />}
            title="We couldn’t load sales"
            description="Check your connection and try again."
            action={<Button onClick={() => void sales.refetch()}>Try again</Button>}
          />
        ) : sales.data?.sales.length === 0 ? (
          <EmptyState
            className="products-feedback"
            icon={<ReceiptText aria-hidden="true" size={28} />}
            title={hasFilters ? 'No matching sales' : 'No sales recorded yet'}
            description={
              hasFilters
                ? 'Clear a filter or try another receipt or customer.'
                : 'Record the first sale to create a receipt and update stock.'
            }
            action={
              hasFilters ? (
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/sales/new">Record sale</Link>
                </Button>
              )
            }
          />
        ) : (
          <>
            <div className="sales-table" role="table" aria-label="Sales records">
              <div className="sales-table__header" role="row">
                <span>Receipt / customer</span>
                <span>Total</span>
                <span>Received</span>
                <span>Balance</span>
                <span>Status</span>
                <span />
              </div>
              {sales.data?.sales.map((sale) => (
                <article className="sales-row" role="row" key={sale.id}>
                  <div className="sale-primary" role="cell">
                    <strong>{sale.receiptNumber}</strong>
                    <small>
                      {sale.customerName || 'Walk-in customer'} · {formatDate(sale.createdAt)}
                    </small>
                  </div>
                  <SaleAmount label="Total" value={sale.totalAmount} />
                  <SaleAmount label="Received" value={sale.amountPaid} />
                  <SaleAmount
                    label="Balance"
                    value={sale.balanceDue}
                    warning={sale.balanceDue > 0}
                  />
                  <div className="sale-status" role="cell">
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
            {sales.data && sales.data.pagination.totalPages > 1 && (
              <nav className="pagination" aria-label="Sales pages">
                <button
                  type="button"
                  disabled={!sales.data.pagination.hasPrevPage}
                  onClick={() => setPage((value) => value - 1)}
                >
                  <ArrowLeft aria-hidden="true" size={16} /> Previous
                </button>
                <span>
                  Page {sales.data.pagination.page} of {sales.data.pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={!sales.data.pagination.hasNextPage}
                  onClick={() => setPage((value) => value + 1)}
                >
                  Next <ArrowRight aria-hidden="true" size={16} />
                </button>
              </nav>
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
  qualified = false,
}: {
  icon: typeof ReceiptText;
  label: string;
  value: string;
  note: string;
  warning?: boolean;
  qualified?: boolean;
}) {
  return (
    <Surface className="sales-metric">
      <div className="sales-metric__top">
        <span className={warning ? 'sales-metric__icon is-warning' : 'sales-metric__icon'}>
          <Icon aria-hidden="true" size={19} />
        </span>
        {qualified && <Badge className="sd-badge--warning">Qualified</Badge>}
      </div>
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
    <div className={warning ? 'sale-amount is-warning' : 'sale-amount'} role="cell">
      <small>{label}</small>
      <strong>{formatNaira.format(value)}</strong>
    </div>
  );
}
function SalesSkeleton() {
  return (
    <div className="product-list-skeleton" aria-label="Loading sales" aria-busy="true">
      {[1, 2, 3, 4].map((item) => (
        <div className="skeleton" key={item} />
      ))}
    </div>
  );
}
function formatStatus(value: string) {
  return value.replaceAll('_', ' ').replace(/^./, (letter) => letter.toUpperCase());
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(new Date(value));
}
