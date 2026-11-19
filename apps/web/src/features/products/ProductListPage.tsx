import { Alert, Badge, Button, EmptyState, Input, PageHeader, Select, Surface } from '@trada/ui';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Boxes,
  ChevronDown,
  CircleDollarSign,
  Mic,
  PackagePlus,
  RefreshCw,
  Repeat2,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import {
  useGetLowStockProductsQuery,
  useGetProductsQuery,
  type ProductListParams,
  type ProductType,
} from '../../lib/api';
import { formatNaira } from '../../lib/formatters';

type StatusFilter = 'all' | 'active' | 'inactive';

export function ProductListPage() {
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');
  const [draftSearch, setDraftSearch] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ProductType | ''>('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const query: ProductListParams = {
    search: search || undefined,
    type: type || undefined,
    isActive: status === 'all' ? undefined : status === 'active',
    page,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  };
  const { data, isLoading, isError, isFetching, refetch } = useGetProductsQuery(query);
  const lowStock = useGetLowStockProductsQuery();
  const hasFilters = Boolean(search || type || status !== 'all');

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(draftSearch.trim());
  }

  function clearFilters() {
    setDraftSearch('');
    setSearch('');
    setType('');
    setStatus('all');
    setPage(1);
  }

  return (
    <div className="products-page">
      <PageHeader
        eyebrow="Inventory"
        title="Inventory"
        description="Find products, review stock levels and keep selling details accurate."
      />

      <div className="inventory-control-toolbar" aria-label="Inventory actions">
        {can(role, 'product:create') && (
          <>
            <Button asChild>
              <Link to="/products/new">
                <PackagePlus aria-hidden="true" size={18} /> Add product
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/products/new?ai=voice">
                <Mic aria-hidden="true" size={17} /> Voice product
              </Link>
            </Button>
          </>
        )}
        <Button
          className="inventory-filter-toggle"
          type="button"
          variant="secondary"
          aria-expanded={filtersOpen}
          aria-controls="inventory-filter-panel"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <SlidersHorizontal aria-hidden="true" size={17} />
          Filter
          {hasFilters && (
            <span className="inventory-filter-toggle__status" aria-label="Filters applied" />
          )}
          <ChevronDown
            aria-hidden="true"
            className={
              filtersOpen
                ? 'inventory-filter-toggle__chevron is-open'
                : 'inventory-filter-toggle__chevron'
            }
            size={15}
          />
        </Button>
      </div>

      <div className="inventory-summary" aria-label="Inventory summary">
        <InventoryMetric
          icon={Boxes}
          label="Total products"
          value={data ? String(data.pagination.total) : 'Unavailable'}
          note="Across your product catalogue"
        />
        <InventoryMetric
          icon={AlertTriangle}
          label="Low-stock items"
          value={lowStock.data ? String(lowStock.data.length) : 'Unavailable'}
          note="At or below their threshold"
          warning={Boolean(lowStock.data?.length)}
        />
        <InventoryMetric
          icon={CircleDollarSign}
          label="Inventory value"
          value="Unavailable"
          note="A valuation basis is not yet defined"
          qualified
        />
        <InventoryMetric
          icon={Repeat2}
          label="Stock movements"
          value="Unavailable"
          note="Movement history is not yet available"
          qualified
        />
      </div>

      {lowStock.isError ? (
        <Alert
          tone="warning"
          icon={<AlertTriangle aria-hidden="true" size={18} />}
          className="inventory-alert"
        >
          <strong>Low-stock status is unavailable.</strong>
          <span>Your product list is still available. Retry the stock check when ready.</span>
          <button type="button" onClick={() => void lowStock.refetch()}>
            Retry stock check
          </button>
        </Alert>
      ) : lowStock.data && lowStock.data.length > 0 ? (
        <Surface className="low-stock-strip" aria-labelledby="low-stock-heading">
          <span className="low-stock-strip__icon">
            <AlertTriangle aria-hidden="true" size={20} />
          </span>
          <div className="low-stock-strip__copy">
            <h2 id="low-stock-heading">
              {lowStock.data.length}{' '}
              {lowStock.data.length === 1 ? 'product needs' : 'products need'} attention
            </h2>
            <p>
              {lowStock.data
                .slice(0, 3)
                .map((product) => `${product.name} (${product.quantity} ${product.unit})`)
                .join(' · ')}
            </p>
          </div>
          <span className="low-stock-strip__label">At or below threshold</span>
        </Surface>
      ) : null}

      <Surface className="products-panel">
        {filtersOpen && (
          <div id="inventory-filter-panel" className="inventory-filter-panel">
            <form
              className="inventory-filters"
              aria-label="Product filters"
              onSubmit={handleSearch}
              role="search"
            >
              <label className="products-search">
                <Search aria-hidden="true" size={18} />
                <Input
                  aria-label="Search products"
                  type="search"
                  placeholder="Search name, SKU or barcode"
                  value={draftSearch}
                  onChange={(event) => setDraftSearch(event.target.value)}
                />
              </label>
              <Select
                aria-label="Filter by product type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value as ProductType | '');
                  setPage(1);
                }}
              >
                <option value="">All product types</option>
                <option value="inventory_based">Inventory based</option>
                <option value="input_based">Input based / service</option>
              </Select>
              <Select
                aria-label="Filter by product status"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as StatusFilter);
                  setPage(1);
                }}
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
              <button className="inventory-filters__apply" type="submit">
                Apply
              </button>
            </form>
          </div>
        )}

        {data && !isLoading && (
          <div className="inventory-results" role="status">
            <span>
              {data.pagination.total} {data.pagination.total === 1 ? 'product' : 'products'} found
            </span>
            <div>
              {hasFilters && (
                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
              <button type="button" onClick={() => void refetch()} aria-label="Refresh products">
                <RefreshCw
                  aria-hidden="true"
                  size={16}
                  className={isFetching ? 'sd-spin' : ''}
                />
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <ProductListSkeleton />
        ) : isError ? (
          <EmptyState
            className="products-feedback"
            icon={<Boxes aria-hidden="true" size={28} />}
            title="We couldn’t load your products"
            description="Check your connection and try again."
            action={<Button onClick={() => void refetch()}>Try again</Button>}
          />
        ) : data?.products.length === 0 ? (
          <EmptyState
            className="products-feedback"
            icon={<Boxes aria-hidden="true" size={28} />}
            title={hasFilters ? 'No matching products' : 'Add your first product'}
            description={
              hasFilters
                ? 'Clear a filter or try another name, SKU or barcode.'
                : 'Products you add will appear here with their price and stock level.'
            }
            action={
              hasFilters ? (
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              ) : can(role, 'product:create') ? (
                <Button asChild>
                  <Link to="/products/new">Add product</Link>
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="product-table" role="table" aria-label="Products">
              <div className="product-table__header" role="row">
                <span>Product</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Status</span>
                <span />
              </div>
              {data?.products.map((product) => {
                const isLow = product.quantity <= product.stockThreshold;
                return (
                  <div className="product-table__row" role="row" key={product.id}>
                    <div className="product-cell product-cell--name" role="cell">
                      <span className="product-image-placeholder">
                        {product.name.charAt(0).toUpperCase()}
                      </span>
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.sku || product.category || 'No SKU recorded'}</small>
                      </span>
                    </div>
                    <div className="product-cell" data-label="Price" role="cell">
                      <strong>{formatNaira.format(product.sellingPrice)}</strong>
                      {product.discountPrice != null && (
                        <small>Offer {formatNaira.format(product.discountPrice)}</small>
                      )}
                    </div>
                    <div className="product-cell" data-label="Stock" role="cell">
                      <strong>
                        {product.quantity} {product.unit}
                      </strong>
                      <small>Alert at {product.stockThreshold}</small>
                    </div>
                    <div className="product-cell" data-label="Status" role="cell">
                      <div className="product-statuses">
                        <Badge className={isLow ? 'sd-badge--warning' : ''}>
                          {isLow ? 'Low stock' : 'Stock okay'}
                        </Badge>
                        {!product.isActive && <Badge>Inactive</Badge>}
                      </div>
                    </div>
                    <Link
                      className="product-row-link"
                      to={`/products/${product.id}`}
                      aria-label={`Edit ${product.name}`}
                    >
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {data && data.pagination.totalPages > 1 && (
              <nav className="pagination" aria-label="Product pages">
                <button
                  type="button"
                  disabled={!data.pagination.hasPrevPage}
                  onClick={() => setPage((current) => current - 1)}
                >
                  <ArrowLeft aria-hidden="true" size={16} /> Previous
                </button>
                <span>
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={!data.pagination.hasNextPage}
                  onClick={() => setPage((current) => current + 1)}
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

function ProductListSkeleton() {
  return (
    <div className="product-list-skeleton" aria-label="Loading products" aria-busy="true">
      {[1, 2, 3, 4].map((item) => (
        <div className="skeleton" key={item} />
      ))}
    </div>
  );
}

function InventoryMetric({
  icon: Icon,
  label,
  value,
  note,
  warning = false,
  qualified = false,
}: {
  icon: typeof Boxes;
  label: string;
  value: string;
  note: string;
  warning?: boolean;
  qualified?: boolean;
}) {
  return (
    <Surface className="inventory-metric">
      <div className="inventory-metric__top">
        <span className={warning ? 'inventory-metric__icon is-warning' : 'inventory-metric__icon'}>
          <Icon aria-hidden="true" size={20} />
        </span>
        {qualified && <Badge className="sd-badge--warning">Qualified</Badge>}
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{note}</small>
    </Surface>
  );
}
