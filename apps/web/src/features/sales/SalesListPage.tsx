import { Alert, Button, EmptyState, Input, PageHeader, Select, Surface } from '@trada/ui';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ListFilter,
  Mic,
  Plus,
  ReceiptText,
  RefreshCw,
  Search,
  ShoppingCart,
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
  const [filtersOpen, setFiltersOpen] = useState(false);
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
        title="Sales"
        description="Record sales, view performance and track revenue."
      />

      <div className="sales-control-toolbar" aria-label="Sales actions">
        <Button asChild>
          <Link to="/sales/new">
            <Plus aria-hidden="true" size={18} /> Record sale
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/sales/new?ai=voice">
            <Mic aria-hidden="true" size={17} /> Voice sale
          </Link>
        </Button>
        <Button
          className="sales-filter-toggle"
          type="button"
          variant="secondary"
          aria-expanded={filtersOpen}
          aria-controls="sales-filter-panel"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <ListFilter aria-hidden="true" size={17} />
          Filter
          {hasFilters && <span className="sales-filter-toggle__status" aria-label="Filters applied" />}
          <ChevronDown
            aria-hidden="true"
            className={filtersOpen ? 'sales-filter-toggle__chevron is-open' : 'sales-filter-toggle__chevron'}
            size={15}
          />
        </Button>
      </div>

      {analytics.isError && (
        <Alert tone="warning" icon={<AlertCircle aria-hidden="true" size={18} />}>
          Sales records are available, but summary figures could not be loaded.
        </Alert>
      )}

      <div className="sales-metrics">
        <Metric
          label="Recorded sales"
          value={analytics.data ? String(analytics.data.totalSalesCount) : '—'}
        />
        <Metric
          label="Booked revenue"
          value={analytics.data ? formatNaira.format(analytics.data.totalRevenue) : '—'}
        />
        <Metric
          label="Gross profit"
          value={analytics.data ? formatNaira.format(analytics.data.grossProfit) : '—'}
        />
        <Metric
          label="Unpaid sale balance"
          value={analytics.data ? formatNaira.format(analytics.data.unpaidBalance) : '—'}
        />
      </div>

      <Surface className="sales-panel">
        {filtersOpen && (
          <div id="sales-filter-panel" className="sales-filter-panel">
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
              <div className="sales-date-range">
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
              </div>
              <button type="submit">Apply</button>
            </form>
          </div>
        )}

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
            <ul className="sales-list" aria-label="Sales records">
              {sales.data?.sales.map((sale) => (
                <li key={sale.id}>
                  <Link
                    className="sales-list-item"
                    to={`/sales/${sale.id}`}
                    aria-label={`View ${sale.receiptNumber}`}
                  >
                    <span className="sales-list-item__icon">
                      <ShoppingCart aria-hidden="true" size={19} />
                    </span>
                    <span className="sales-list-item__primary">
                      <strong>{formatSaleLabel(sale)}</strong>
                      <small>{formatSaleTimestamp(sale.createdAt)}</small>
                    </span>
                    <span className={`sales-payment-method sales-payment-method--${sale.paymentMethod}`}>
                      {formatPaymentMethod(sale.paymentMethod)}
                    </span>
                    <strong className="sales-list-item__amount">
                      {formatNaira.format(sale.totalAmount)}
                    </strong>
                  </Link>
                </li>
              ))}
            </ul>
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
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Surface className="sales-metric">
      <p>{label}</p>
      <strong>{value}</strong>
    </Surface>
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
function formatPaymentMethod(value: string) {
  if (value === 'pos') return 'POS/Card';
  return formatStatus(value);
}
function formatSaleLabel(sale: {
  receiptNumber: string;
  items: Array<{ productName: string; quantity: number }>;
}) {
  const [firstItem] = sale.items;
  if (!firstItem) return sale.receiptNumber;
  const quantity = Number.isInteger(firstItem.quantity)
    ? String(firstItem.quantity)
    : firstItem.quantity.toLocaleString('en-NG', { maximumFractionDigits: 2 });
  const firstLabel = `${firstItem.productName}${firstItem.quantity === 1 ? '' : ` (x${quantity})`}`;
  return sale.items.length === 1 ? firstLabel : `${firstLabel} +${sale.items.length - 1} more`;
}
function formatSaleTimestamp(value: string) {
  const date = new Date(value);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();
  const time = new Intl.DateTimeFormat('en-NG', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
  if (sameDay) return `Today, ${time}`;
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium' }).format(date);
}
