import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const DEMO_ACCESS_TOKEN = 'trada-demo-access-token';
export const DEMO_REFRESH_TOKEN = 'trada-demo-refresh-token';
export const DEMO_EMAIL = 'demo@trada.local';
export const DEMO_PASSWORD = 'demo1234';
export const demoUser = {
  id: 'demo-owner',
  firstName: 'Ada',
  lastName: 'Okafor',
  email: DEMO_EMAIL,
  phoneNumber: '08012345678',
  role: 'owner',
  isActive: true,
};

type DemoResult = { data: unknown } | { error: FetchBaseQueryError };
type DemoProduct = (typeof initialProducts)[number];

const now = new Date();
const minutesAgo = (minutes: number) => new Date(now.getTime() - minutes * 60_000).toISOString();

const initialProducts = [
  product('product-rice', 'Mama Gold Rice 5kg', 'Food', 18, 5, 14800, 17500, 'bag', 'RICE-5KG'),
  product('product-oil', 'Kings Vegetable Oil 3L', 'Food', 4, 5, 6900, 8200, 'bottle', 'OIL-3L'),
  product('product-milk', 'Peak Milk 400g', 'Dairy', 3, 6, 3100, 3800, 'tin', 'MILK-400'),
  product(
    'product-soap',
    'Sunlight Detergent 1kg',
    'Household',
    22,
    8,
    1800,
    2350,
    'pack',
    'SOAP-1KG',
  ),
  product(
    'product-data',
    'Mobile Data Setup',
    'Services',
    999,
    0,
    0,
    2500,
    'service',
    'SERVICE-DATA',
    'input_based',
  ),
];

const products = structuredClone(initialProducts);
const sales = [
  makeSale('sale-3', 'REC-DEMO-003', minutesAgo(18), 'Chidi Eze', 'transfer', 23400, 23400, [
    saleItem('item-4', initialProducts[0], 1, 17500),
    saleItem('item-5', initialProducts[2], 2, 3800, 1700),
  ]),
  makeSale('sale-2', 'REC-DEMO-002', minutesAgo(67), 'Amina Bello', 'credit', 8200, 3000, [
    saleItem('item-3', initialProducts[1], 1, 8200),
  ]),
  makeSale('sale-1', 'REC-DEMO-001', minutesAgo(130), null, 'cash', 9400, 9400, [
    saleItem('item-1', initialProducts[3], 4, 2350),
  ]),
];

export function isDemoCredentials(email: string, password: string) {
  return import.meta.env.DEV && email.toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export function runDemoRequest(request: string | FetchArgs): DemoResult {
  const args = typeof request === 'string' ? { url: request } : request;
  const method = (args.method ?? 'GET').toUpperCase();
  const params = (args.params ?? {}) as Record<string, unknown>;
  const path = args.url;

  if (path === '/auth/me' && method === 'GET') return ok(demoUser);
  if (path === '/products/alerts/low-stock' && method === 'GET')
    return ok(
      products
        .filter(
          (item) =>
            item.isActive &&
            item.type === 'inventory_based' &&
            item.quantity <= item.stockThreshold,
        )
        .map(({ id, name, quantity, stockThreshold, unit, location }) => ({
          id,
          name,
          quantity,
          stockThreshold,
          unit,
          location,
        })),
    );
  if (path === '/products' && method === 'GET') return productList(params);
  if (path === '/products' && method === 'POST') return createProduct(args.body);
  if (path === '/sales/reports/analytics' && method === 'GET') return analytics(params);
  if (path === '/sales' && method === 'GET') return saleList(params);
  if (path === '/sales' && method === 'POST') return createSale(args.body);

  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    const index = products.findIndex((item) => item.id === productMatch[1]);
    if (index < 0) return fail(404, 'Product not found');
    if (method === 'GET') return ok(products[index]);
    if (method === 'PATCH') {
      products[index] = {
        ...products[index],
        ...(args.body as Partial<DemoProduct>),
        updatedAt: new Date().toISOString(),
      };
      return ok(products[index]);
    }
    if (method === 'DELETE') {
      products.splice(index, 1);
      return { data: undefined };
    }
  }

  const cancelMatch = path.match(/^\/sales\/([^/]+)\/cancel$/);
  if (cancelMatch && method === 'POST') return cancelSale(cancelMatch[1]);
  const saleMatch = path.match(/^\/sales\/([^/]+)$/);
  if (saleMatch && method === 'GET') {
    const sale = sales.find((item) => item.id === saleMatch[1]);
    return sale ? ok(sale) : fail(404, 'Sale not found');
  }

  return fail(404, 'Demo route not found');
}

function productList(params: Record<string, unknown>): DemoResult {
  let result = [...products];
  const search = String(params.search ?? '').toLowerCase();
  if (search)
    result = result.filter((item) =>
      `${item.name} ${item.sku ?? ''}`.toLowerCase().includes(search),
    );
  if (params.category) result = result.filter((item) => item.category === params.category);
  if (params.type) result = result.filter((item) => item.type === params.type);
  if (params.condition) result = result.filter((item) => item.condition === params.condition);
  if (params.isActive !== undefined)
    result = result.filter((item) => item.isActive === asBoolean(params.isActive));
  const sortBy = String(params.sortBy ?? 'createdAt') as keyof DemoProduct;
  const direction = params.sortOrder === 'ASC' ? 1 : -1;
  result.sort((a, b) => String(a[sortBy] ?? '').localeCompare(String(b[sortBy] ?? '')) * direction);
  return paged(result, params);
}

function createProduct(body: unknown): DemoResult {
  const input = body as Omit<DemoProduct, 'id' | 'createdAt' | 'updatedAt'>;
  const created = {
    ...input,
    id: `product-demo-${Date.now()}`,
    businessId: 'demo-business',
    createdById: demoUser.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as DemoProduct;
  products.unshift(created);
  return ok(created);
}

function saleList(params: Record<string, unknown>): DemoResult {
  let result = filterSales(params);
  const search = String(params.search ?? '').toLowerCase();
  if (search)
    result = result.filter((sale) =>
      `${sale.receiptNumber} ${sale.customerName ?? ''}`.toLowerCase().includes(search),
    );
  if (params.paymentStatus)
    result = result.filter((sale) => sale.paymentStatus === params.paymentStatus);
  if (params.paymentMethod)
    result = result.filter((sale) => sale.paymentMethod === params.paymentMethod);
  if (params.status) result = result.filter((sale) => sale.status === params.status);
  result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return paged(result, params);
}

function createSale(body: unknown): DemoResult {
  const input = body as {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    paymentMethod: string;
    amountPaid: number;
    discountAmount: number;
    taxAmount: number;
    notes?: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      discountAmount: number;
    }>;
  };
  const items = [];
  for (const inputItem of input.items) {
    const selected = products.find((item) => item.id === inputItem.productId);
    if (!selected) return fail(404, 'Product not found');
    if (selected.type === 'inventory_based' && selected.quantity < inputItem.quantity)
      return fail(400, `Insufficient stock for '${selected.name}'.`);
    if (selected.type === 'inventory_based') selected.quantity -= inputItem.quantity;
    items.push(
      saleItem(
        `item-demo-${Date.now()}-${items.length}`,
        selected,
        inputItem.quantity,
        inputItem.unitPrice,
        inputItem.discountAmount,
      ),
    );
  }
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const total = Math.max(0, subtotal - input.discountAmount + input.taxAmount);
  const id = `sale-demo-${Date.now()}`;
  const created = makeSale(
    id,
    `REC-DEMO-${String(sales.length + 1).padStart(3, '0')}`,
    new Date().toISOString(),
    input.customerName ?? null,
    input.paymentMethod,
    total,
    input.amountPaid,
    items,
    input,
  );
  sales.unshift(created);
  return ok(created);
}

function cancelSale(id: string): DemoResult {
  const sale = sales.find((item) => item.id === id);
  if (!sale) return fail(404, 'Sale not found');
  if (sale.status !== 'cancelled') {
    for (const item of sale.items) {
      const selected = products.find((productItem) => productItem.id === item.productId);
      if (selected?.type === 'inventory_based') selected.quantity += item.quantity;
    }
  }
  sale.status = 'cancelled';
  sale.paymentStatus = 'refunded';
  sale.updatedAt = new Date().toISOString();
  return ok({
    id: sale.id,
    receiptNumber: sale.receiptNumber,
    status: sale.status,
    paymentStatus: sale.paymentStatus,
    totalAmount: sale.totalAmount,
  });
}

function analytics(params: Record<string, unknown>): DemoResult {
  const completed = filterSales(params).filter((sale) => sale.status !== 'cancelled');
  const totalRevenue = sum(completed, (sale) => sale.totalAmount);
  const totalCost = completed.reduce(
    (total, sale) => total + sum(sale.items, (item) => (item.costPrice ?? 0) * item.quantity),
    0,
  );
  return ok({
    totalSalesCount: completed.length,
    totalRevenue,
    totalCost,
    grossProfit: totalRevenue - totalCost,
    totalDiscount: sum(completed, (sale) => sale.discountAmount),
    totalTax: sum(completed, (sale) => sale.taxAmount),
    unpaidBalance: sum(completed, (sale) => sale.balanceDue),
  });
}

function filterSales(params: Record<string, unknown>) {
  return sales.filter((sale) => {
    const date = sale.createdAt.slice(0, 10);
    return (
      (!params.startDate || date >= String(params.startDate)) &&
      (!params.endDate || date <= String(params.endDate))
    );
  });
}

function paged<T>(items: T[], params: Record<string, unknown>): DemoResult {
  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 10);
  const totalPages = Math.ceil(items.length / limit);
  return {
    data: {
      success: true,
      data: items.slice((page - 1) * limit, page * limit),
      pagination: {
        total: items.length,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  };
}

function ok(data: unknown): DemoResult {
  return { data: { success: true, message: 'Demo request completed', data } };
}

function fail(status: number, message: string): DemoResult {
  return { error: { status, data: { success: false, message } } as FetchBaseQueryError };
}

function product(
  id: string,
  name: string,
  category: string,
  quantity: number,
  stockThreshold: number,
  costPrice: number,
  sellingPrice: number,
  unit: string,
  sku: string,
  type = 'inventory_based',
) {
  return {
    id,
    name,
    description: `${name} demo record`,
    type,
    category,
    unit,
    quantity,
    stockThreshold,
    costPrice,
    sellingPrice,
    discountPrice: null,
    condition: 'new',
    location: 'Main store',
    sku,
    barcode: null,
    isActive: true,
    businessId: 'demo-business',
    createdById: demoUser.id,
    createdAt: minutesAgo(1440),
    updatedAt: minutesAgo(20),
  };
}

function saleItem(
  id: string,
  selected: DemoProduct,
  quantity: number,
  unitPrice: number,
  discountAmount = 0,
) {
  const subtotal = unitPrice * quantity;
  return {
    id,
    productId: selected.id,
    productName: selected.name,
    sku: selected.sku,
    costPrice: selected.costPrice,
    unitPrice,
    quantity,
    subtotal,
    discountAmount,
    total: subtotal - discountAmount,
  };
}

function makeSale(
  id: string,
  receiptNumber: string,
  createdAt: string,
  customerName: string | null,
  paymentMethod: string,
  totalAmount: number,
  amountPaid: number,
  items: ReturnType<typeof saleItem>[],
  extras: Record<string, unknown> = {},
) {
  const balanceDue = Math.max(0, totalAmount - amountPaid);
  return {
    id,
    receiptNumber,
    customerName,
    customerPhone: extras.customerPhone ?? null,
    customerEmail: extras.customerEmail ?? null,
    subtotal: items.reduce((total, item) => total + item.total, 0),
    discountAmount: Number(extras.discountAmount ?? 0),
    taxAmount: Number(extras.taxAmount ?? 0),
    totalAmount,
    amountPaid,
    balanceDue,
    paymentMethod,
    paymentStatus: balanceDue === 0 ? 'paid' : amountPaid > 0 ? 'partially_paid' : 'unpaid',
    status: 'completed',
    notes: extras.notes ?? null,
    items,
    createdAt,
    updatedAt: createdAt,
  };
}

function sum<T>(items: T[], select: (item: T) => number) {
  return items.reduce((total, item) => total + select(item), 0);
}

function asBoolean(value: unknown) {
  return value === true || value === 'true';
}
