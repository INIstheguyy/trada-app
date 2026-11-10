import { Badge, Button, Surface } from '@trada/ui';
import {
  AlertCircle,
  ArrowRight,
  Banknote,
  Box,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ReceiptText,
  RefreshCw,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import {
  useGetLowStockProductsQuery,
  useGetSalesAnalyticsQuery,
  useGetSalesQuery,
} from '../../lib/api';
import { formatNaira } from '../../lib/formatters';

type Metric = {
  key: 'sales' | 'cash' | 'profit' | 'debt';
  label: string;
  value: number | null;
  note: string;
  incomplete?: boolean;
};

const metricIcons: Record<Metric['key'], LucideIcon> = {
  sales: ReceiptText,
  cash: WalletCards,
  profit: CircleDollarSign,
  debt: Banknote,
};

export function OwnerDashboard({ firstName = 'Tola' }: { firstName?: string }) {
  const today = localDateKey(new Date());
  const analytics = useGetSalesAnalyticsQuery({ startDate: today, endDate: today });
  const lowStock = useGetLowStockProductsQuery();
  const recentSales = useGetSalesQuery({
    startDate: today,
    endDate: today,
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

  if (isLoading) return <DashboardSkeleton />;

  const isFetching = analytics.isFetching || lowStock.isFetching || recentSales.isFetching;
  const metrics: Metric[] = [
    {
      key: 'sales',
      label: 'Sales today',
      value: analytics.data?.totalRevenue ?? null,
      note: analytics.data
        ? `${analytics.data.totalSalesCount} recorded ${analytics.data.totalSalesCount === 1 ? 'sale' : 'sales'}`
        : 'Sales analytics is temporarily unavailable',
      incomplete: !analytics.data,
    },
    {
      key: 'cash',
      label: 'Cash received',
      value: null,
      note: 'Not provided by the current analytics contract',
      incomplete: true,
    },
    {
      key: 'profit',
      label: 'Gross profit',
      value: analytics.data?.grossProfit ?? null,
      note: analytics.data
        ? 'Backend treatment of missing cost prices is not defined'
        : 'Sales analytics is temporarily unavailable',
      incomplete: true,
    },
    {
      key: 'debt',
      label: 'Unpaid sale balance',
      value: analytics.data?.unpaidBalance ?? null,
      note: analytics.data
        ? 'This is not a verified customer debtor ledger'
        : 'Sales analytics is temporarily unavailable',
      incomplete: true,
    },
  ];
  const asOf = new Intl.DateTimeFormat('en-NG', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());
  const saleCount = analytics.data?.totalSalesCount;
  const stockCount = lowStock.data?.length;

  return (
    <div className="dashboard">
      <div className="dashboard__heading">
        <div>
          <p className="eyebrow">Owner command centre</p>
          <h1>Good afternoon, {firstName}</h1>
          <p>Here’s what has been recorded today.</p>
        </div>
        <span className="period-button">Today</span>
      </div>

      <Surface className="briefing" aria-labelledby="briefing-title">
        <div className="briefing__icon">
          <Sparkles aria-hidden="true" size={22} />
        </div>
        <div className="briefing__content">
          <div className="briefing__meta">
            <h2 id="briefing-title">Today’s Sabi briefing</h2>
            <Badge className={hasPartialError ? 'sd-badge--warning' : ''}>
              {hasPartialError ? (
                <AlertCircle aria-hidden="true" size={14} />
              ) : (
                <CheckCircle2 aria-hidden="true" size={14} />
              )}{' '}
              {hasPartialError ? 'Partial data' : 'From recorded data'}
            </Badge>
          </div>
          <p>{buildBriefing(saleCount, analytics.data?.totalRevenue, stockCount)}</p>
        </div>
      </Surface>

      {hasPartialError && (
        <div className="dashboard-warning" role="status">
          <AlertCircle aria-hidden="true" size={17} />
          <span>
            Some dashboard information could not be loaded. Available figures are still shown.
          </span>
          <button type="button" onClick={refresh}>
            Retry missing data
          </button>
        </div>
      )}

      <div className="section-heading">
        <div>
          <h2>Business snapshot</h2>
          <p>Updated {asOf}</p>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label="Refresh dashboard"
          onClick={refresh}
        >
          <RefreshCw aria-hidden="true" size={17} className={isFetching ? 'sd-spin' : ''} />
        </button>
      </div>
      <div className="metrics-grid">
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.key];
          return (
            <Surface className="metric-card" key={metric.key}>
              <div className="metric-card__top">
                <span className={`metric-card__icon metric-card__icon--${metric.key}`}>
                  <Icon aria-hidden="true" size={20} />
                </span>
                {metric.incomplete && (
                  <Badge className="sd-badge--warning">
                    <AlertCircle aria-hidden="true" size={13} /> Qualified
                  </Badge>
                )}
              </div>
              <p className="metric-card__label">{metric.label}</p>
              <strong className="metric-card__value">
                {metric.value === null ? 'Unavailable' : formatNaira.format(metric.value)}
              </strong>
              <p
                className={
                  metric.incomplete
                    ? 'metric-card__note metric-card__note--warning'
                    : 'metric-card__note'
                }
              >
                {metric.note}
              </p>
            </Surface>
          );
        })}
      </div>

      <div className="dashboard__columns">
        <Surface className="panel attention-panel">
          <div className="panel__heading">
            <div>
              <h2>Low-stock attention</h2>
              <p>Products at or below their threshold</p>
            </div>
            {lowStock.data && <span className="count-badge">{lowStock.data.length}</span>}
          </div>
          {lowStock.isLoading ? (
            <PanelSkeleton />
          ) : lowStock.isError || !lowStock.data ? (
            <DashboardPanelError
              message="Low-stock data is unavailable."
              onRetry={() => void lowStock.refetch()}
            />
          ) : lowStock.data.length === 0 ? (
            <DashboardEmpty icon={Box} message="No low-stock products right now." />
          ) : (
            <div className="attention-list">
              {lowStock.data.slice(0, 5).map((product) => (
                <article className="attention-item" key={product.id}>
                  <span className="attention-item__icon attention-item__icon--high">
                    <Box aria-hidden="true" size={19} />
                  </span>
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.quantity} {product.unit} left · threshold {product.stockThreshold}
                    </p>
                    <Link to={`/products/${product.id}`}>
                      Review product <ArrowRight aria-hidden="true" size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Surface>

        <Surface className="panel products-panel">
          <div className="panel__heading">
            <div>
              <h2>Recent sales</h2>
              <p>Latest records from today</p>
            </div>
            <Link className="text-action" to="/sales">
              View all
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
            <DashboardEmpty icon={ReceiptText} message="No sales recorded today." />
          ) : (
            <div className="product-list">
              {recentSales.data.sales.map((sale) => (
                <Link
                  className="product-row dashboard-sale-row"
                  key={sale.id}
                  to={`/sales/${sale.id}`}
                >
                  <span className="product-rank">
                    <ReceiptText aria-hidden="true" size={15} />
                  </span>
                  <div className="product-row__main">
                    <h3>{sale.receiptNumber}</h3>
                    <p>
                      {sale.customerName || 'Walk-in customer'} ·{' '}
                      {sale.paymentStatus.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="product-row__value">
                    <strong>{formatNaira.format(sale.totalAmount)}</strong>
                    <span>{formatTime(sale.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Surface>
      </div>

      <p className="dashboard__footnote">
        <Clock3 aria-hidden="true" size={14} /> Figures reflect backend records fetched at {asOf}.
        Sales revenue, cash received, profit and unpaid balances are not treated as interchangeable.
      </p>
    </div>
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
    <div className="dashboard" aria-busy="true" aria-label="Loading dashboard">
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--briefing" />
      <div className="metrics-grid">
        {[1, 2, 3, 4].map((number) => (
          <div className="skeleton skeleton--metric" key={number} />
        ))}
      </div>
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

function buildBriefing(saleCount?: number, revenue?: number, stockCount?: number) {
  const parts: string[] = [];
  if (saleCount !== undefined && revenue !== undefined)
    parts.push(
      `${saleCount} ${saleCount === 1 ? 'sale' : 'sales'} worth ${formatNaira.format(revenue)} recorded today.`,
    );
  else parts.push('Today’s sales summary is temporarily unavailable.');
  if (stockCount !== undefined)
    parts.push(`${stockCount} ${stockCount === 1 ? 'product needs' : 'products need'} restocking.`);
  else parts.push('Low-stock status is temporarily unavailable.');
  return parts.join(' ');
}

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-NG', { hour: 'numeric', minute: '2-digit' }).format(
    new Date(value),
  );
}
