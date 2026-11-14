import { AppShell } from '@trada/ui';
import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getMerchantNavigation } from './app/navigation';
import { can, normalizeRole, type Action } from './app/permissions';
import { ProtectedRoute, RequirePermission } from './features/auth/ProtectedRoute';
import { signedOut } from './features/auth/authSlice';
import { RequireBusiness } from './features/business/RequireBusiness';
import { api, useGetMyBusinessQuery } from './lib/api';

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
            <BusinessScreen action="sale:create" activeNav="sales">
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
            <BusinessScreen action="product:create" activeNav="products">
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
}: {
  action?: Action;
  activeNav: string;
  children: ReactNode;
}) {
  const content = action ? (
    <RequirePermission action={action}>{children}</RequirePermission>
  ) : (
    children
  );

  return (
    <ProtectedRoute>
      <RequireBusiness>
        <AuthenticatedShell activeNav={activeNav}>{content}</AuthenticatedShell>
      </RequireBusiness>
    </ProtectedRoute>
  );
}

function AuthenticatedShell({ children, activeNav }: { children: ReactNode; activeNav: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { data: business } = useGetMyBusinessQuery();
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Trada user';
  const role = normalizeRole(user?.role ?? 'user');

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
      recordSaleHref={can(role, 'sale:create') ? '/sales/new' : undefined}
      onNavigate={(href) => navigate(href)}
      onSignOut={handleSignOut}
      activeNav={activeNav}
    >
      {children}
    </AppShell>
  );
}

function OwnerDashboardContent() {
  const user = useAppSelector((state) => state.auth.user);
  return <OwnerDashboard firstName={user?.firstName ?? 'there'} />;
}
