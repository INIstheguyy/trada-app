import { AppShell } from '@trada/ui';
import type { ReactNode } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { LoginPage } from './features/auth/LoginPage';
import { ProtectedRoute, RequirePermission } from './features/auth/ProtectedRoute';
import { RegisterPage } from './features/auth/RegisterPage';
import { signedOut } from './features/auth/authSlice';
import { OwnerDashboard } from './features/dashboard/OwnerDashboard';
import { ProductFormPage } from './features/products/ProductFormPage';
import { ProductListPage } from './features/products/ProductListPage';
import { SaleCheckoutPage } from './features/sales/SaleCheckoutPage';
import { SaleDetailPage } from './features/sales/SaleDetailPage';
import { SalesListPage } from './features/sales/SalesListPage';
import { api } from './lib/api';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RequirePermission action="dashboard:view">
              <AuthenticatedShell activeNav="home">
                <OwnerDashboardContent />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <RequirePermission action="sale:view">
              <AuthenticatedShell activeNav="sales">
                <SalesListPage />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales/new"
        element={
          <ProtectedRoute>
            <RequirePermission action="sale:create">
              <AuthenticatedShell activeNav="sales">
                <SaleCheckoutPage />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales/:id"
        element={
          <ProtectedRoute>
            <RequirePermission action="sale:view">
              <AuthenticatedShell activeNav="sales">
                <SaleDetailPage />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <RequirePermission action="product:view">
              <AuthenticatedShell activeNav="products">
                <ProductListPage />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <RequirePermission action="product:create">
              <AuthenticatedShell activeNav="products">
                <ProductFormPage />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <RequirePermission action="product:update">
              <AuthenticatedShell activeNav="products">
                <ProductFormPage />
              </AuthenticatedShell>
            </RequirePermission>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AuthenticatedShell({ children, activeNav }: { children: ReactNode; activeNav: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Trada user';

  function handleSignOut() {
    dispatch(signedOut());
    dispatch(api.util.resetApiState());
    navigate('/login', { replace: true });
  }

  return (
    <AppShell
      userName={fullName}
      userRole={user?.role ?? 'user'}
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
