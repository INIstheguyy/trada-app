import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { can, normalizeRole, type Action } from '../../app/permissions';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export function RequirePermission({ action, children }: { action: Action; children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);

  if (!user || !can(normalizeRole(user.role), action)) {
    return (
      <div className="permission-denied" role="alert">
        <h1>You don’t have access to this page</h1>
        <p>Ask your business owner to update your permissions.</p>
      </div>
    );
  }

  return children;
}
