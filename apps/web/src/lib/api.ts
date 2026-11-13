import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { z } from 'zod';
import { accessTokenUpdated, signedOut, type AuthState } from '../features/auth/authSlice';

const apiEnvelopeSchema = <T extends z.ZodType>(data: T) =>
  z.object({ success: z.boolean(), message: z.string().optional(), data });

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  role: z.string().default('user'),
  isActive: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const loginDataSchema = z
  .object({
    accessToken: z.string().optional(),
    token: z.string().optional(),
    refreshToken: z.string(),
    user: userSchema
      .omit({ role: true })
      .extend({ role: z.string().default('user') })
      .optional(),
  })
  .refine((data) => data.accessToken || data.token, {
    message: 'Login response did not include an access token',
  })
  .transform(({ accessToken, token, refreshToken, user }) => ({
    accessToken: accessToken ?? token!,
    refreshToken,
    user,
  }));

const refreshDataSchema = z
  .object({ accessToken: z.string().optional(), token: z.string().optional() })
  .refine((data) => data.accessToken || data.token, {
    message: 'Refresh response did not include an access token',
  })
  .transform(({ accessToken, token }) => ({ accessToken: accessToken ?? token! }));

export function parseLoginResponse(response: unknown) {
  return apiEnvelopeSchema(loginDataSchema).parse(response).data;
}

export function parseRefreshResponse(response: unknown) {
  return apiEnvelopeSchema(refreshDataSchema).parse(response).data;
}

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};
export type LoginData = z.infer<typeof loginDataSchema>;
export type ProfileData = z.infer<typeof userSchema>;

const businessSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  currency: z.string(),
  industry: z.string(),
  isLive: z.boolean(),
  user: z.object({ id: z.string() }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Business = z.infer<typeof businessSchema>;
export type BusinessInput = Pick<
  Business,
  'name' | 'description' | 'category' | 'currency' | 'industry'
>;
export type BusinessUpdateInput = Partial<BusinessInput>;

export function parseBusinessResponse(response: unknown) {
  return apiEnvelopeSchema(businessSchema).parse(response).data;
}

const productTypeSchema = z.enum(['inventory_based', 'input_based']);
const productConditionSchema = z.enum(['new', 'used', 'foreign_used']);
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  type: productTypeSchema,
  category: z.string().optional().nullable(),
  unit: z.string(),
  quantity: z.number(),
  stockThreshold: z.number(),
  costPrice: z.number().optional().nullable(),
  sellingPrice: z.number(),
  discountPrice: z.number().optional().nullable(),
  condition: productConditionSchema.optional().default('new'),
  location: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  businessId: z.string().optional(),
  createdById: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const paginationSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

const lowStockProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  stockThreshold: z.number(),
  unit: z.string(),
  location: z.string().optional().nullable(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductType = z.infer<typeof productTypeSchema>;
export type ProductCondition = z.infer<typeof productConditionSchema>;
export type LowStockProduct = z.infer<typeof lowStockProductSchema>;
export type ProductInput = Omit<
  Product,
  'id' | 'businessId' | 'createdById' | 'createdAt' | 'updatedAt'
>;
export type ProductListParams = {
  search?: string;
  category?: string;
  type?: ProductType | '';
  condition?: ProductCondition | '';
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'name' | 'sellingPrice' | 'quantity';
  sortOrder?: 'ASC' | 'DESC';
};

const paymentMethodSchema = z.enum(['cash', 'pos', 'transfer', 'credit', 'split']);
const paymentStatusSchema = z.enum(['paid', 'partially_paid', 'unpaid', 'refunded']);
const saleStatusSchema = z.enum(['completed', 'pending', 'cancelled', 'refunded']);
const saleItemSchema = z.object({
  id: z.string(),
  productId: z.string().optional(),
  productName: z.string(),
  sku: z.string().optional().nullable(),
  costPrice: z.number().optional().nullable(),
  unitPrice: z.number(),
  quantity: z.number(),
  subtotal: z.number().optional(),
  discountAmount: z.number().default(0),
  total: z.number(),
});
const saleSchema = z.object({
  id: z.string(),
  receiptNumber: z.string(),
  customerName: z.string().optional().nullable(),
  customerPhone: z.string().optional().nullable(),
  customerEmail: z.string().optional().nullable(),
  subtotal: z.number(),
  discountAmount: z.number().default(0),
  taxAmount: z.number().default(0),
  totalAmount: z.number(),
  amountPaid: z.number(),
  balanceDue: z.number(),
  paymentMethod: paymentMethodSchema,
  paymentStatus: paymentStatusSchema,
  status: saleStatusSchema,
  notes: z.string().optional().nullable(),
  items: z.array(saleItemSchema),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});
const saleAnalyticsSchema = z.object({
  totalSalesCount: z.number(),
  totalRevenue: z.number(),
  totalCost: z.number(),
  grossProfit: z.number(),
  totalDiscount: z.number(),
  totalTax: z.number(),
  unpaidBalance: z.number(),
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type SaleStatus = z.infer<typeof saleStatusSchema>;
export type Sale = z.infer<typeof saleSchema>;
export type SaleAnalytics = z.infer<typeof saleAnalyticsSchema>;
export type CreateSaleInput = {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  paymentMethod: PaymentMethod;
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
export type SaleListParams = {
  search?: string;
  paymentMethod?: PaymentMethod | '';
  paymentStatus?: PaymentStatus | '';
  status?: SaleStatus | '';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'totalAmount' | 'receiptNumber';
  sortOrder?: 'ASC' | 'DESC';
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://api.trada.com.ng/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as { auth: AuthState }).auth;
    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);
    headers.set('accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  apiContext,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, apiContext, extraOptions);
  const isRefreshRequest = typeof args !== 'string' && args.url === '/auth/refresh';

  if (result.error?.status === 401 && !isRefreshRequest) {
    const { refreshToken } = (apiContext.getState() as { auth: AuthState }).auth;

    if (!refreshToken) {
      apiContext.dispatch(signedOut());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
      apiContext,
      extraOptions,
    );

    try {
      const refreshed = parseRefreshResponse(refreshResult.data);
      apiContext.dispatch(accessTokenUpdated(refreshed.accessToken));
      result = await rawBaseQuery(args, apiContext, extraOptions);
    } catch {
      apiContext.dispatch(signedOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Business', 'Product', 'Sale'],
  endpoints: (builder) => ({
    register: builder.mutation<ProfileData, RegisterRequest>({
      query: (account) => ({ url: '/auth/register', method: 'POST', body: account }),
      transformResponse: (response: unknown) => apiEnvelopeSchema(userSchema).parse(response).data,
    }),
    login: builder.mutation<LoginData, LoginRequest>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
      transformResponse: parseLoginResponse,
    }),
    getProfile: builder.query<ProfileData, void>({
      query: () => '/auth/me',
      transformResponse: (response: unknown) => apiEnvelopeSchema(userSchema).parse(response).data,
    }),
    getMyBusiness: builder.query<Business, void>({
      query: () => '/businesses/me',
      transformResponse: parseBusinessResponse,
      providesTags: (result) =>
        result
          ? [
              { type: 'Business', id: 'CURRENT' },
              { type: 'Business', id: result.id },
            ]
          : [{ type: 'Business', id: 'CURRENT' }],
    }),
    createBusiness: builder.mutation<Business, BusinessInput>({
      query: (business) => ({
        url: '/businesses',
        method: 'POST',
        body: { ...business, isLive: false },
      }),
      transformResponse: parseBusinessResponse,
      invalidatesTags: [{ type: 'Business', id: 'CURRENT' }],
    }),
    updateBusiness: builder.mutation<
      Business,
      { id: string; changes: BusinessUpdateInput }
    >({
      query: ({ id, changes }) => ({
        url: `/businesses/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      transformResponse: parseBusinessResponse,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Business', id: 'CURRENT' },
        { type: 'Business', id },
      ],
    }),
    getProducts: builder.query<
      { products: Product[]; pagination: z.infer<typeof paginationSchema> },
      ProductListParams | void
    >({
      query: (params) => ({
        url: '/products',
        params: params
          ? Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''))
          : undefined,
      }),
      transformResponse: (response: unknown) => {
        const parsed = z
          .object({
            success: z.boolean(),
            message: z.string().optional(),
            data: z.array(productSchema),
            pagination: paginationSchema,
          })
          .parse(response);
        return { products: parsed.data, pagination: parsed.pagination };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map((product) => ({ type: 'Product' as const, id: product.id })),
              { type: 'Product' as const, id: 'LIST' },
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),
    getLowStockProducts: builder.query<LowStockProduct[], void>({
      query: () => '/products/alerts/low-stock',
      transformResponse: (response: unknown) =>
        apiEnvelopeSchema(z.array(lowStockProductSchema)).parse(response).data,
      providesTags: [{ type: 'Product', id: 'LOW_STOCK' }],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: unknown) =>
        apiEnvelopeSchema(productSchema).parse(response).data,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, ProductInput>({
      query: (product) => ({ url: '/products', method: 'POST', body: product }),
      transformResponse: (response: unknown) =>
        apiEnvelopeSchema(productSchema).parse(response).data,
      invalidatesTags: [
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'LOW_STOCK' },
      ],
    }),
    updateProduct: builder.mutation<Product, { id: string; changes: Partial<ProductInput> }>({
      query: ({ id, changes }) => ({ url: `/products/${id}`, method: 'PATCH', body: changes }),
      transformResponse: (response: unknown) =>
        apiEnvelopeSchema(
          productSchema.partial({
            description: true,
            type: true,
            category: true,
            unit: true,
            costPrice: true,
            discountPrice: true,
            condition: true,
            location: true,
            sku: true,
            barcode: true,
            isActive: true,
          }),
        ).parse(response).data as Product,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'LOW_STOCK' },
      ],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      transformResponse: () => undefined,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'LOW_STOCK' },
      ],
    }),
    getSales: builder.query<
      { sales: Sale[]; pagination: z.infer<typeof paginationSchema> },
      SaleListParams | void
    >({
      query: (params) => ({
        url: '/sales',
        params: params
          ? Object.fromEntries(Object.entries(params).filter(([, value]) => value !== ''))
          : undefined,
      }),
      transformResponse: (response: unknown) => {
        const parsed = z
          .object({
            success: z.boolean(),
            message: z.string().optional(),
            data: z.array(saleSchema),
            pagination: paginationSchema,
          })
          .parse(response);
        return { sales: parsed.data, pagination: parsed.pagination };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.sales.map((sale) => ({ type: 'Sale' as const, id: sale.id })),
              { type: 'Sale' as const, id: 'LIST' },
            ]
          : [{ type: 'Sale' as const, id: 'LIST' }],
    }),
    getSale: builder.query<Sale, string>({
      query: (id) => `/sales/${id}`,
      transformResponse: (response: unknown) => apiEnvelopeSchema(saleSchema).parse(response).data,
      providesTags: (_result, _error, id) => [{ type: 'Sale', id }],
    }),
    createSale: builder.mutation<Sale, CreateSaleInput>({
      query: (sale) => ({ url: '/sales', method: 'POST', body: sale }),
      transformResponse: (response: unknown) => apiEnvelopeSchema(saleSchema).parse(response).data,
      invalidatesTags: [
        { type: 'Sale', id: 'LIST' },
        { type: 'Sale', id: 'ANALYTICS' },
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'LOW_STOCK' },
      ],
    }),
    cancelSale: builder.mutation<
      Pick<Sale, 'id' | 'receiptNumber' | 'status' | 'paymentStatus' | 'totalAmount'>,
      string
    >({
      query: (id) => ({ url: `/sales/${id}/cancel`, method: 'POST' }),
      transformResponse: (response: unknown) =>
        apiEnvelopeSchema(
          saleSchema.pick({
            id: true,
            receiptNumber: true,
            status: true,
            paymentStatus: true,
            totalAmount: true,
          }),
        ).parse(response).data,
      invalidatesTags: (_result, _error, id) => [
        { type: 'Sale', id },
        { type: 'Sale', id: 'LIST' },
        { type: 'Sale', id: 'ANALYTICS' },
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: 'LOW_STOCK' },
      ],
    }),
    getSalesAnalytics: builder.query<
      SaleAnalytics,
      { startDate?: string; endDate?: string } | void
    >({
      query: (params) => ({ url: '/sales/reports/analytics', params: params ?? undefined }),
      transformResponse: (response: unknown) =>
        apiEnvelopeSchema(saleAnalyticsSchema).parse(response).data,
      providesTags: [{ type: 'Sale', id: 'ANALYTICS' }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useGetMyBusinessQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useGetProductsQuery,
  useGetLowStockProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSalesQuery,
  useGetSaleQuery,
  useCreateSaleMutation,
  useCancelSaleMutation,
  useGetSalesAnalyticsQuery,
} = api;
