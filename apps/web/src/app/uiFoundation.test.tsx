// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { CircleAlert, PackageOpen } from 'lucide-react';
import { Alert, EmptyState, FormField, Input, PageHeader, StatCard } from '@trada/ui';
import { describe, expect, test } from 'vitest';

describe('shared UI foundations', () => {
  test('provides labelled and described form fields', () => {
    render(
      <FormField
        htmlFor="business-name"
        label="Business name"
        hint="Used across your workspace"
        required
      >
        <Input id="business-name" aria-describedby="business-name-hint" required />
      </FormField>,
    );

    expect(screen.getByLabelText('Business name *')).toBeRequired();
    expect(screen.getByText('Used across your workspace')).toHaveAttribute(
      'id',
      'business-name-hint',
    );
  });

  test('exposes semantic feedback and reusable page patterns', () => {
    render(
      <>
        <PageHeader eyebrow="Inventory" title="Products" description="Manage current stock." />
        <Alert tone="error" icon={<CircleAlert aria-hidden="true" />}>
          Could not save.
        </Alert>
        <StatCard label="Sales today" value="₦15,000" note="2 recorded sales" />
        <EmptyState
          icon={<PackageOpen aria-hidden="true" />}
          title="No products yet"
          description="Add a product to begin recording stock."
        />
      </>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save.');
    expect(screen.getByText('₦15,000')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'No products yet' })).toBeInTheDocument();
  });
});
