import { Badge, Button, Surface } from '@trada/ui';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Boxes,
  PackagePlus,
  RefreshCw,
  Search,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole } from '../../app/permissions';
import { formatNaira } from '../../lib/formatters';
import { useGetLowStockProductsQuery, useGetProductsQuery } from '../../lib/api';

export function ProductListPage() {
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');
  const [draftSearch, setDraftSearch] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching, refetch } = useGetProductsQuery({
    search,
    page,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });
  const { data: lowStock = [] } = useGetLowStockProductsQuery();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(draftSearch.trim());
  }

  return (
    <div className="products-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Products</h1>
          <p>Manage prices, stock levels and the items your business sells.</p>
        </div>
        {can(role, 'product:create') && (
          <Button asChild>
            <Link to="/products/new">
              <PackagePlus aria-hidden="true" size={18} /> Add product
            </Link>
          </Button>
        )}
      </div>

      {lowStock.length > 0 && (
        <Surface className="low-stock-strip" aria-labelledby="low-stock-heading">
          <span className="low-stock-strip__icon">
            <AlertTriangle aria-hidden="true" size={20} />
          </span>
          <div>
            <h2 id="low-stock-heading">
              {lowStock.length} {lowStock.length === 1 ? 'product is' : 'products are'} running low
            </h2>
            <p>
              {lowStock
                .slice(0, 3)
                .map((product) => `${product.name} (${product.quantity} ${product.unit})`)
                .join(' · ')}
            </p>
          </div>
        </Surface>
      )}

      <Surface className="products-panel">
        <div className="products-toolbar">
          <form className="products-search" onSubmit={handleSearch} role="search">
            <Search aria-hidden="true" size={18} />
            <input
              aria-label="Search products"
              type="search"
              placeholder="Search by name, SKU or barcode"
              value={draftSearch}
              onChange={(event) => setDraftSearch(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <button
            className="icon-button"
            type="button"
            onClick={() => refetch()}
            aria-label="Refresh products"
          >
            <RefreshCw aria-hidden="true" size={17} className={isFetching ? 'sd-spin' : ''} />
          </button>
        </div>

        {isLoading ? (
          <ProductListSkeleton />
        ) : isError ? (
          <div className="products-feedback" role="alert">
            <Boxes aria-hidden="true" size={28} />
            <h2>We couldn’t load your products</h2>
            <p>Check your connection and try again.</p>
            <Button onClick={() => refetch()}>Try again</Button>
          </div>
        ) : data?.products.length === 0 ? (
          <div className="products-feedback">
            <Boxes aria-hidden="true" size={28} />
            <h2>{search ? 'No matching products' : 'Add your first product'}</h2>
            <p>
              {search
                ? 'Try another name, SKU or barcode.'
                : 'Products you add will appear here with their price and stock level.'}
            </p>
            {!search && can(role, 'product:create') && (
              <Button asChild>
                <Link to="/products/new">Add product</Link>
              </Button>
            )}
          </div>
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
                    <div className="product-cell product-cell--name">
                      <span className="product-image-placeholder">
                        {product.name.charAt(0).toUpperCase()}
                      </span>
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.sku || product.category || 'No SKU'}</small>
                      </span>
                    </div>
                    <div className="product-cell" data-label="Price">
                      <strong>{formatNaira.format(product.sellingPrice)}</strong>
                      {product.discountPrice && (
                        <small>Offer {formatNaira.format(product.discountPrice)}</small>
                      )}
                    </div>
                    <div className="product-cell" data-label="Stock">
                      <strong>
                        {product.quantity} {product.unit}
                      </strong>
                      <small>Alert at {product.stockThreshold}</small>
                    </div>
                    <div className="product-cell" data-label="Status">
                      <Badge className={isLow ? 'sd-badge--warning' : ''}>
                        {isLow ? 'Low stock' : product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <Link
                      className="product-row-link"
                      to={`/products/${product.id}`}
                      aria-label={`View ${product.name}`}
                    >
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {data && data.pagination.totalPages > 1 && (
              <div className="pagination">
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
              </div>
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
