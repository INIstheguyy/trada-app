import { AppShell } from '@trada/ui';
import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getMerchantNavigation } from './app/navigation';
import { can, normalizeRole, type Action } from './app/permissions';
import { ProtectedRoute, RequirePermission } from './features/auth/ProtectedRoute';
import { signedOut } from './features/auth/authSlice';
import { RequireBusiness } from './features/business/RequireBusiness';
import {
  api,
  useGetLowStockProductsQuery,
  useGetMyBusinessQuery,
  useGetSalesAnalyticsQuery,
} from './lib/api';
import { formatNaira } from './lib/formatters';

const LoginPage = lazy(() =>
  import('./features/auth/LoginPage').then(({ LoginPage }) => ({ default: LoginPage })),
);
const RegisterPage = lazy(() =>
  import('./features/auth/RegisterPage').then(({ RegisterPage }) => ({ default: RegisterPage })),
);
const BusinessOnboardingPage = lazy(() =>
  import('./features/business/BusinessOnboardingPage').then(({ BusinessOnboardingPage }) => ({
    default: BusinessOnboardingPage,
  })),
);
const BusinessSettingsPage = lazy(() =>
  import('./features/business/BusinessSettingsPage').then(({ BusinessSettingsPage }) => ({
    default: BusinessSettingsPage,
  })),
);
const OwnerDashboard = lazy(() =>
  import('./features/dashboard/OwnerDashboard').then(({ OwnerDashboard }) => ({
    default: OwnerDashboard,
  })),
);
const ProductFormPage = lazy(() =>
  import('./features/products/ProductFormPage').then(({ ProductFormPage }) => ({
    default: ProductFormPage,
  })),
);
const ProductListPage = lazy(() =>
  import('./features/products/ProductListPage').then(({ ProductListPage }) => ({
    default: ProductListPage,
  })),
);
const SaleCheckoutPage = lazy(() =>
  import('./features/sales/SaleCheckoutPage').then(({ SaleCheckoutPage }) => ({
    default: SaleCheckoutPage,
  })),
);
const SaleDetailPage = lazy(() =>
  import('./features/sales/SaleDetailPage').then(({ SaleDetailPage }) => ({
    default: SaleDetailPage,
  })),
);
const SalesListPage = lazy(() =>
  import('./features/sales/SalesListPage').then(({ SalesListPage }) => ({
    default: SalesListPage,
  })),
);

export function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/onboarding/business"
          element={
            <ProtectedRoute>
              <BusinessOnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <BusinessScreen action="dashboard:view" activeNav="home">
              <OwnerDashboardContent />
            </BusinessScreen>
          }
        />
        <Route
          path="/sales"
          element={
            <BusinessScreen action="sale:view" activeNav="sales">
              <SalesListPage />
            </BusinessScreen>
          }
        />
        <Route
          path="/sales/new"
          element={
            <BusinessScreen action="sale:create" activeNav="sales" focusedCapture>
              <SaleCheckoutPage />
            </BusinessScreen>
          }
        />
        <Route
          path="/sales/:id"
          element={
            <BusinessScreen action="sale:view" activeNav="sales">
              <SaleDetailPage />
            </BusinessScreen>
          }
        />
        <Route
          path="/products"
          element={
            <BusinessScreen action="product:view" activeNav="products">
              <ProductListPage />
            </BusinessScreen>
          }
        />
        <Route
          path="/products/new"
          element={
            <BusinessScreen action="product:create" activeNav="products" focusedCapture>
              <ProductFormPage />
            </BusinessScreen>
          }
        />
        <Route
          path="/products/:id"
          element={
            <BusinessScreen action="product:update" activeNav="products">
              <ProductFormPage />
            </BusinessScreen>
          }
        />
        <Route
          path="/settings/business"
          element={
            <BusinessScreen action="business:update" activeNav="settings">
              <BusinessSettingsPage />
            </BusinessScreen>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function RouteLoading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <img className="route-loading__logo" src="/trada-logo.jpeg" alt="" />
      <span>Loading your workspace…</span>
    </div>
  );
}

function BusinessScreen({
  action,
  activeNav,
  children,
  focusedCapture = false,
}: {
  action?: Action;
  activeNav: string;
  children: ReactNode;
  focusedCapture?: boolean;
}) {
  const content = action ? (
    <RequirePermission action={action}>{children}</RequirePermission>
  ) : (
    children
  );

  return (
    <ProtectedRoute>
      <RequireBusiness>
        <AuthenticatedShell activeNav={activeNav} focusedCapture={focusedCapture}>
          {content}
        </AuthenticatedShell>
      </RequireBusiness>
    </ProtectedRoute>
  );
}

function AuthenticatedShell({
  children,
  activeNav,
  focusedCapture,
}: {
  children: ReactNode;
  activeNav: string;
  focusedCapture: boolean;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { data: business } = useGetMyBusinessQuery();
  const briefingAnalytics = useGetSalesAnalyticsQuery({}, { skip: activeNav !== 'home' });
  const briefingStock = useGetLowStockProductsQuery(undefined, { skip: activeNav !== 'home' });
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Trada user';
  const role = normalizeRole(user?.role ?? 'user');
  const aiActions = [
    ...(can(role, 'sale:create')
      ? [
          {
            id: 'voice-sale',
            label: 'Record a sale by voice',
            description: 'Speak a sale, review the draft, then confirm it yourself.',
            href: '/sales/new?ai=voice',
            icon: 'sales' as const,
          },
        ]
      : []),
    ...(can(role, 'product:create')
      ? [
          {
            id: 'voice-product',
            label: 'Add a product by voice',
            description: 'Describe a product and review editable details before saving.',
            href: '/products/new?ai=voice',
            icon: 'inventory' as const,
          },
        ]
      : []),
  ];
  const aiBriefing =
    activeNav === 'home'
      ? {
          title: 'Your business briefing',
          summary: buildBusinessBriefing(
            briefingAnalytics.data?.totalSalesCount,
            briefingAnalytics.data?.totalRevenue,
            briefingStock.data?.length,
          ),
          status:
            briefingAnalytics.isError || briefingStock.isError
              ? 'Partial recorded data'
              : briefingAnalytics.isLoading || briefingStock.isLoading
                ? 'Preparing briefing'
                : 'From recorded data',
          meta: `Today · ${new Intl.DateTimeFormat('en-NG', {
            hour: 'numeric',
            minute: '2-digit',
          }).format(new Date())}`,
        }
      : undefined;

  function handleSignOut() {
    dispatch(signedOut());
    dispatch(api.util.resetApiState());
    navigate('/login', { replace: true });
  }

  return (
    <AppShell
      userName={fullName}
      userRole={user?.role ?? 'user'}
      businessName={business?.name ?? 'Your business'}
      navigation={getMerchantNavigation(role)}
      aiActions={aiActions}
      aiBriefing={aiBriefing}
      onNavigate={(href) => navigate(href)}
      onSignOut={handleSignOut}
      activeNav={activeNav}
      hideMobileNavigation={focusedCapture}
    >
      {children}
    </AppShell>
  );
}

function OwnerDashboardContent() {
  const user = useAppSelector((state) => state.auth.user);
  return <OwnerDashboard firstName={user?.firstName ?? 'there'} />;
}

function buildBusinessBriefing(
  saleCount: number | undefined,
  revenue: number | undefined,
  stockCount: number | undefined,
) {
  const salesSummary =
    saleCount === undefined || revenue === undefined
      ? 'Today’s sales summary is still loading or unavailable.'
      : `${saleCount} ${saleCount === 1 ? 'sale' : 'sales'} worth ${formatNaira.format(revenue)} recorded today.`;
  const stockSummary =
    stockCount === undefined
      ? 'Low-stock status is still loading or unavailable.'
      : stockCount === 0
        ? 'No products currently need restocking.'
        : `${stockCount} ${stockCount === 1 ? 'product needs' : 'products need'} restocking.`;
  return `${salesSummary} ${stockSummary}`;
}
