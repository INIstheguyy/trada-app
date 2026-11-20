import { Button, PageHeader, Surface } from '@trada/ui';
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  Box,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
  LoaderCircle,
  PackagePlus,
  ReceiptText,
  RefreshCw,
  ShoppingCart,
  Store,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import {
  useGetLowStockProductsQuery,
  useGetSalesAnalyticsQuery,
  useGetSalesQuery,
} from '../../lib/api';
import { formatNaira, localDateKey } from '../../lib/formatters';

type DashboardPeriod = 'today' | '7days' | '14days' | '30days' | 'custom';

type Metric = {
  key: 'sales' | 'profit' | 'inventory' | 'debt';
  label: string;
  value: number | null;
};

const periodOptions: { value: Exclude<DashboardPeriod, 'custom'>; label: string; days: number }[] =
  [
    { value: 'today', label: 'Today', days: 1 },
    { value: '7days', label: 'Last 7 days', days: 7 },
    { value: '14days', label: 'Last 14 days', days: 14 },
    { value: '30days', label: 'Last 30 days', days: 30 },
  ];

const metricIcons: Record<Metric['key'], LucideIcon> = {
  sales: ShoppingCart,
  profit: ChartNoAxesColumnIncreasing,
  inventory: Box,
  debt: Banknote,
};

export function OwnerDashboard({ firstName = 'there' }: { firstName?: string }) {
  const today = new Date();
  const todayKey = localDateKey(today);
  const [period, setPeriod] = useState<DashboardPeriod>('today');
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [filterOpen, setFilterOpen] = useState(false);
  const [lowStockOpen, setLowStockOpen] = useState(false);
  const dateRange = getDateRange(period, selectedDate);
  const periodLabel = getPeriodLabel(period, selectedDate, todayKey);
  const periodContext = getPeriodContext(period, selectedDate, todayKey);
  const analytics = useGetSalesAnalyticsQuery(dateRange);
  const lowStock = useGetLowStockProductsQuery();
  const recentSales = useGetSalesQuery({
    ...dateRange,
    page: 1,
    limit: 5,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });

  const isLoading =
    !analytics.data &&
    !lowStock.data &&
    !recentSales.data &&
    (analytics.isLoading || lowStock.isLoading || recentSales.isLoading);
  const hasPartialError = analytics.isError || lowStock.isError || recentSales.isError;

  function refresh() {
    void analytics.refetch();
    void lowStock.refetch();
    void recentSales.refetch();
  }

  function selectPeriod(nextPeriod: Exclude<DashboardPeriod, 'custom'>) {
    setPeriod(nextPeriod);
    setSelectedDate(todayKey);
    setFilterOpen(false);
  }

  if (isLoading) return <DashboardSkeleton />;

  const isFetching = analytics.isFetching || lowStock.isFetching || recentSales.isFetching;
  const metrics: Metric[] = [
    {
      key: 'sales',
      label: period === 'today' ? "Today's sales" : 'Sales revenue',
      value: analytics.data?.totalRevenue ?? null,
    },
    {
      key: 'profit',
      label: period === 'today' ? "Today's gross profit" : 'Gross profit',
      value: analytics.data?.grossProfit ?? null,
    },
    {
      key: 'inventory',
      label: 'Inventory value',
      value: null,
    },
    {
      key: 'debt',
      label: 'Unpaid sale balance',
      value: analytics.data?.unpaidBalance ?? null,
    },
  ];
  const stockCount = lowStock.data?.length;

  return (
    <div className="dashboard dashboard--reference">
      <PageHeader
        className="dashboard__heading"
        title={`${getGreeting(today)}, ${firstName} 👋`}
        description="Here's how your business is doing today."
        actions={
          <div className="dashboard-heading-actions">
            <div className={`dashboard-filter${filterOpen ? ' is-open' : ''}`}>
              <button
                className="dashboard-filter__trigger"
                type="button"
                aria-expanded={filterOpen}
                aria-controls="dashboard-filter-panel"
                onClick={() => setFilterOpen((open) => !open)}
              >
                <CalendarDays aria-hidden="true" size={18} />
                <span>{periodLabel}</span>
                <ChevronDown aria-hidden="true" size={16} />
              </button>
              <div className="dashboard-filter__panel" id="dashboard-filter-panel">
                <label className="dashboard-date-picker">
                  <span>Date</span>
                  <input
                    type="date"
                    aria-label="Dashboard date"
                    max={todayKey}
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value || todayKey);
                      setPeriod(event.target.value === todayKey ? 'today' : 'custom');
                      setFilterOpen(false);
                    }}
                  />
                </label>
                <div className="dashboard-filter__shortcuts" aria-label="Dashboard date ranges">
                  {periodOptions.slice(1).map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={period === option.value ? 'is-active' : ''}
                      aria-pressed={period === option.value}
                      onClick={() => selectPeriod(option.value)}
                    >
                      {option.days} days
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="icon-button dashboard-refresh"
              type="button"
              aria-label="Refresh dashboard"
              onClick={refresh}
            >
              <RefreshCw aria-hidden="true" size={17} className={isFetching ? 'sd-spin' : ''} />
            </button>
          </div>
        }
      />

      {hasPartialError && (
        <div className="dashboard-warning" role="status">
          <AlertCircle aria-hidden="true" size={17} />
          <span>
            Some dashboard information could not be loaded. Available figures are still shown.
          </span>
          <button type="button" onClick={refresh}>
            Retry
          </button>
        </div>
      )}

      <section className="metrics-grid" aria-label={`Business summary for ${periodLabel}`}>
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.key];
          return (
            <Surface key={metric.key} className={`metric-card metric-card--${metric.key}`}>
              <span className={`metric-card__icon metric-card__icon--${metric.key}`}>
                <Icon aria-hidden="true" size={22} />
              </span>
              <div className="metric-card__body">
                <p className="metric-card__label">{metric.label}</p>
                {metric.value === null ? (
                  <strong className="metric-card__placeholder" aria-label="Data unavailable">
                    —
                  </strong>
                ) : (
                  <strong className="metric-card__value">{formatNaira.format(metric.value)}</strong>
                )}
              </div>
            </Surface>
          );
        })}
      </section>

      <div className="dashboard-middle">
        <section className="dashboard-quick-section" aria-labelledby="quick-actions-title">
          <div className="dashboard-section-title">
            <div>
              <h2 id="quick-actions-title">Quick actions</h2>
            </div>
          </div>
          <div className="dashboard-quick-grid">
            <button
              className={`dashboard-quick-action${lowStockOpen ? ' is-active' : ''}`}
              type="button"
              aria-expanded={lowStockOpen}
              aria-controls="dashboard-low-stock"
              onClick={() => setLowStockOpen((open) => !open)}
            >
              <span className="dashboard-quick-action__icon">
                <AlertCircle aria-hidden="true" size={23} />
                <small>{stockCount ?? '—'}</small>
              </span>
              <strong>Low stock</strong>
            </button>
            <QuickAction icon={PackagePlus} label="Add product" to="/products/new" />
            <QuickAction icon={Box} label="Inventory" to="/products" />
            <QuickAction icon={ReceiptText} label="Record sale" to="/sales/new" />
          </div>

          {lowStockOpen && (
            <Surface className="dashboard-low-stock" id="dashboard-low-stock">
              <div className="panel__heading">
                <div>
                  <h3>Low-stock products</h3>
                  <p>Products at or below their restock threshold</p>
                </div>
                {stockCount !== undefined && <span className="count-badge">{stockCount}</span>}
              </div>
              {lowStock.isLoading ? (
                <PanelSkeleton />
              ) : lowStock.isError || !lowStock.data ? (
                <DashboardPanelError
                  message="Low-stock data is unavailable."
                  onRetry={() => void lowStock.refetch()}
                />
              ) : lowStock.data.length === 0 ? (
                <DashboardEmpty icon={Box} message="Stock levels look healthy right now." />
              ) : (
                <div className="attention-list">
                  {lowStock.data.slice(0, 3).map((product) => (
                    <article className="attention-item" key={product.id}>
                      <span className="attention-item__icon attention-item__icon--medium">
                        <Box aria-hidden="true" size={19} />
                      </span>
                      <div>
                        <h3>{product.name}</h3>
                        <p>
                          {product.quantity} {product.unit} left · threshold{' '}
                          {product.stockThreshold}
                        </p>
                        <Link to={`/products/${product.id}`}>
                          Review product <ArrowRight aria-hidden="true" size={15} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              {lowStock.data && lowStock.data.length > 3 && (
                <Link className="panel__footer-action" to="/products">
                  Review all low-stock products <ArrowRight aria-hidden="true" size={15} />
                </Link>
              )}
            </Surface>
          )}
        </section>

        <section className="store-feature-preview" aria-labelledby="store-preview-title">
          <div className="store-feature-preview__art" aria-hidden="true">
            <Store size={38} />
            <ShoppingCart size={19} />
          </div>
          <div className="store-feature-preview__copy">
            <span className="store-feature-preview__status">
              <LoaderCircle className="sd-spin" aria-hidden="true" size={14} /> In development
            </span>
            <h2 id="store-preview-title">Share your store</h2>
            <p>Your BNPL-powered online storefront is being prepared.</p>
          </div>
        </section>
      </div>

      <Surface className="panel sales-panel dashboard-transactions">
        <div className="panel__heading">
          <div>
            <h2>Recent transactions</h2>
            <p>{periodContext}</p>
          </div>
          <Link className="text-action" to="/sales">
            View all <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
        {recentSales.isLoading ? (
          <PanelSkeleton />
        ) : recentSales.isError || !recentSales.data ? (
          <DashboardPanelError
            message="Recent sales are unavailable."
            onRetry={() => void recentSales.refetch()}
          />
        ) : recentSales.data.sales.length === 0 ? (
          <DashboardEmpty icon={ReceiptText} message={`No sales recorded ${periodContext}.`} />
        ) : (
          <div className="product-list">
            {recentSales.data.sales.map((sale) => (
              <Link
                className="product-row dashboard-sale-row"
                key={sale.id}
                to={`/sales/${sale.id}`}
              >
                <span className="product-rank">
                  <ShoppingCart aria-hidden="true" size={15} />
                </span>
                <div className="product-row__main">
                  <h3>{sale.items[0]?.productName ?? sale.receiptNumber}</h3>
                  <p>
                    {formatSaleSummary(sale.items.length, sale.receiptNumber, sale.paymentStatus)}
                  </p>
                </div>
                <div className="product-row__value">
                  <strong>{formatNaira.format(sale.totalAmount)}</strong>
                  <span>{formatTransactionDate(sale.createdAt, todayKey)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Surface>

    </div>
  );
}

function QuickAction({ icon: Icon, label, to }: { icon: LucideIcon; label: string; to: string }) {
  return (
    <Link className="dashboard-quick-action" to={to}>
      <span className="dashboard-quick-action__icon">
        <Icon aria-hidden="true" size={23} />
      </span>
      <strong>{label}</strong>
    </Link>
  );
}

function DashboardEmpty({ icon: Icon, message }: { icon: LucideIcon; message: string }) {
  return (
    <div className="dashboard-empty">
      <Icon aria-hidden="true" size={22} />
      <p>{message}</p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="dashboard dashboard--reference" aria-busy="true" aria-label="Loading dashboard">
      <div className="skeleton skeleton--title" />
      <div className="metrics-grid">
        {[1, 2, 3, 4].map((number) => (
          <div className="skeleton skeleton--metric" key={number} />
        ))}
      </div>
      <div className="skeleton skeleton--briefing" />
    </div>
  );
}

function DashboardPanelError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="dashboard-panel-error" role="alert">
      <AlertCircle aria-hidden="true" size={22} />
      <p>{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

function PanelSkeleton() {
  return <div className="skeleton dashboard-panel-skeleton" aria-label="Loading panel" />;
}

function getGreeting(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDateRange(period: DashboardPeriod, endDateKey: string) {
  if (period === 'today') return {};

  const endDate = new Date(`${endDateKey}T12:00:00`);
  const startDate = new Date(endDate);
  const option = periodOptions.find((item) => item.value === period);
  const dayCount = option?.days ?? 1;
  startDate.setDate(startDate.getDate() - (dayCount - 1));
  return { startDate: localDateKey(startDate), endDate: localDateKey(endDate) };
}

function getPeriodLabel(period: DashboardPeriod, selectedDate: string, todayKey: string) {
  if (period === 'today' || period === 'custom') return formatDateLabel(selectedDate, todayKey);
  return periodOptions.find((option) => option.value === period)?.label ?? 'Today';
}

function getPeriodContext(period: DashboardPeriod, selectedDate: string, todayKey: string) {
  if (period === 'today') return 'today';
  if (period === 'custom') return `on ${formatDateLabel(selectedDate, todayKey)}`;
  const label = periodOptions.find((option) => option.value === period)?.label ?? 'Today';
  return `in the ${label.toLowerCase()}`;
}

function formatDateLabel(value: string, todayKey: string) {
  if (value === todayKey) {
    return new Intl.DateTimeFormat('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(`${value}T12:00:00`));
  }
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`));
}

function formatSaleSummary(itemCount: number, receiptNumber: string, paymentStatus: string) {
  const itemLabel = `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
  return `${receiptNumber} · ${itemLabel} · ${paymentStatus.replace('_', ' ')}`;
}

function formatTransactionDate(value: string, todayKey: string) {
  const date = new Date(value);
  const dateKey = localDateKey(date);
  const time = new Intl.DateTimeFormat('en-NG', { hour: 'numeric', minute: '2-digit' }).format(
    date,
  );
  if (dateKey === todayKey) return `Today, ${time}`;
  return new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short' }).format(date);
}
