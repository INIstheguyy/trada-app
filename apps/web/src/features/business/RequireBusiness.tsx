import { Button, EmptyState } from '@trada/ui';
import { Building2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useGetMyBusinessQuery } from '../../lib/api';
import { apiStatus } from '../../lib/apiStatus';

export function RequireBusiness({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { data: business, error, isLoading, isFetching, refetch } = useGetMyBusinessQuery();
  if (business) return children;
  if (isLoading || isFetching)
    return (
      <section className="access-state" role="status" aria-busy="true">
        <span className="route-loading__mark">T</span>
        <h1>Preparing your workspace</h1>
        <p>We’re securely loading the business connected to this account.</p>
      </section>
    );
  if (apiStatus(error) === 404)
    return (
      <Navigate
        to="/onboarding/business"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  return (
    <EmptyState
      className="access-state"
      role="alert"
      icon={<Building2 aria-hidden="true" size={28} />}
      title="We couldn’t load your business"
      description="Your account is still signed in. Check your connection and try again."
      action={
        <Button type="button" onClick={() => void refetch()}>
          Try again
        </Button>
      }
    />
  );
}
