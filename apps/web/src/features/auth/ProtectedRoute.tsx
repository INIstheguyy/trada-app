import { Button, EmptyState } from '@trada/ui';
import { ShieldAlert, UserRoundCheck } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { can, normalizeRole, type Action } from '../../app/permissions';
import { useGetProfileQuery } from '../../lib/api';
import { profileUpdated } from './authSlice';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const profileQuery = useGetProfileQuery(undefined, { skip: !accessToken || Boolean(user) });

  useEffect(() => {
    if (profileQuery.data && !user) dispatch(profileUpdated(profileQuery.data));
  }, [dispatch, profileQuery.data, user]);

  if (!accessToken) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (user) return children;

  if (profileQuery.isLoading || profileQuery.isFetching || profileQuery.data) {
    return (
      <section className="access-state" role="status" aria-busy="true">
        <span className="route-loading__mark">T</span>
        <h1>Restoring your account</h1>
        <p>We’re securely verifying the signed-in Trada session.</p>
      </section>
    );
  }

  return (
    <EmptyState
      className="access-state"
      role="alert"
      icon={<UserRoundCheck aria-hidden="true" size={28} />}
      title="We couldn’t verify your account"
      description="Your session is still stored, but the account profile could not be loaded. Check your connection and try again."
      action={
        <Button type="button" onClick={() => void profileQuery.refetch()}>
          Try again
        </Button>
      }
    />
  );
}

export function RequirePermission({ action, children }: { action: Action; children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  const role = normalizeRole(user?.role ?? 'user');

  if (!user || !can(role, action)) {
    return (
      <EmptyState
        className="permission-denied"
        role="alert"
        icon={<ShieldAlert aria-hidden="true" size={28} />}
        title="This action isn’t available for your account"
        description={
          <>
            {permissionDescription(action)} Your current interface role is{' '}
            <strong>{formatRole(user?.role)}</strong>. Backend authorization remains authoritative.
          </>
        }
        action={
          <Button asChild variant="secondary">
            <Link to="/">Return to overview</Link>
          </Button>
        }
      />
    );
  }

  return children;
}

function permissionDescription(action: Action) {
  if (action === 'sale:cancel') return 'This account cannot cancel completed sales.';
  if (action === 'product:delete') return 'This account cannot permanently delete products.';
  if (action === 'business:update') return 'This account cannot update business identity.';
  if (action.startsWith('sale:')) return 'This account cannot use the requested sales workflow.';
  if (action.startsWith('product:'))
    return 'This account cannot use the requested inventory workflow.';
  return 'This account cannot open the requested workspace area.';
}

function formatRole(role?: string) {
  if (!role || role === 'user') return 'account user';
  return role === 'owner' || role === 'manager' || role === 'staff' ? role : 'account user';
}
