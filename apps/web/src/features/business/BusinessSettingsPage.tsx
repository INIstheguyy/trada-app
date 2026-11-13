import {
  Alert,
  Badge,
  Button,
  EmptyState,
  FormField,
  Input,
  PageHeader,
  Select,
  Surface,
  Textarea,
} from '@trada/ui';
import { AlertCircle, ArrowLeft, Building2, LockKeyhole, Save, Users } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import {
  useGetMyBusinessQuery,
  useUpdateBusinessMutation,
  type BusinessInput,
} from '../../lib/api';
import { readApiError } from '../../lib/apiError';

const emptyForm: BusinessInput = {
  name: '',
  description: '',
  category: 'Inventory based',
  currency: 'NGN',
  industry: '',
};

export function BusinessSettingsPage() {
  const businessQuery = useGetMyBusinessQuery();
  const [updateBusiness, updateState] = useUpdateBusinessMutation();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!businessQuery.data) return;
    setForm({
      name: businessQuery.data.name,
      description: businessQuery.data.description,
      category: businessQuery.data.category,
      currency: businessQuery.data.currency,
      industry: businessQuery.data.industry,
    });
  }, [businessQuery.data]);

  if (businessQuery.isLoading || businessQuery.isFetching)
    return (
      <div className="settings-page" aria-busy="true" aria-label="Loading business settings">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--briefing" />
      </div>
    );

  if (businessQuery.isError || !businessQuery.data)
    return (
      <EmptyState
        className="products-feedback"
        icon={<Building2 aria-hidden="true" size={28} />}
        title="We couldn’t load business settings"
        description="Your workspace is still protected. Check your connection and try again."
        action={<Button onClick={() => void businessQuery.refetch()}>Try again</Button>}
      />
    );

  const business = businessQuery.data;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setSaved(false);
    try {
      await updateBusiness({
        id: business.id,
        changes: {
          name: form.name.trim(),
          description: form.description.trim(),
          category: form.category,
          currency: form.currency,
          industry: form.industry.trim(),
        },
      }).unwrap();
      setSaved(true);
    } catch (reason) {
      setError(readApiError(reason, 'We couldn’t save your business details. Try again.'));
    }
  }

  return (
    <div className="settings-page">
      <Link className="back-link" to="/">
        <ArrowLeft aria-hidden="true" size={16} /> Overview
      </Link>
      <PageHeader
        eyebrow="Workspace settings"
        title="Business identity"
        description="Keep the business details used across your private records accurate."
        actions={
          <Badge className="sd-badge--warning">
            <LockKeyhole aria-hidden="true" size={13} /> Private workspace
          </Badge>
        }
      />

      <form className="settings-form" onSubmit={handleSubmit}>
        {error && (
          <Alert tone="error" icon={<AlertCircle aria-hidden="true" size={18} />}>
            {error}
          </Alert>
        )}
        {saved && <Alert tone="success">Business details saved.</Alert>}

        <div className="settings-layout">
          <Surface className="settings-section">
            <div className="form-section-heading">
              <span className="settings-section__icon">
                <Building2 aria-hidden="true" size={19} />
              </span>
              <div>
                <h2>Business details</h2>
                <p>These values identify the business throughout this workspace.</p>
              </div>
            </div>
            <div className="form-grid">
              <SettingsField
                id="business-name"
                label="Business name"
                value={form.name}
                onChange={(name) => setForm({ ...form, name })}
                required
              />
              <FormField
                className="product-form-field--wide"
                htmlFor="business-description"
                label="Business description"
                required
              >
                <Textarea
                  id="business-description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                />
              </FormField>
              <FormField htmlFor="business-category" label="Business category" required>
                <Select
                  id="business-category"
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                  required
                >
                  <option value="Inventory based">Inventory based</option>
                  <option value="Input based">Input based</option>
                </Select>
              </FormField>
              <SettingsField
                id="business-industry"
                label="Industry"
                value={form.industry}
                onChange={(industry) => setForm({ ...form, industry })}
                required
              />
              <FormField
                htmlFor="business-currency"
                label="Working currency"
                hint="Only Nigerian naira is currently supported."
              >
                <Select
                  id="business-currency"
                  value={form.currency}
                  disabled
                  aria-describedby="business-currency-hint"
                >
                  <option value="NGN">Nigerian naira (NGN)</option>
                </Select>
              </FormField>
            </div>
          </Surface>

          <aside className="settings-aside">
            <Surface className="settings-status-card">
              <span className="settings-section__icon">
                <LockKeyhole aria-hidden="true" size={19} />
              </span>
              <div>
                <h2>Workspace visibility</h2>
                <p>
                  This screen does not publish a storefront. Publication eligibility and visibility
                  controls are not available.
                </p>
                <Badge className="sd-badge--warning">
                  {business.isLive ? 'Backend live flag active' : 'Private workspace'}
                </Badge>
                {business.isLive && (
                  <small>The backend flag does not by itself confirm a public storefront.</small>
                )}
              </div>
            </Surface>
            <Surface className="settings-status-card">
              <span className="settings-section__icon">
                <Users aria-hidden="true" size={19} />
              </span>
              <div>
                <h2>Team access</h2>
                <p>
                  Staff invitations and role management are unavailable until membership and
                  permission contracts are confirmed.
                </p>
                <Badge>Contract pending</Badge>
              </div>
            </Surface>
          </aside>
        </div>

        <div className="product-form-actions">
          <span>Backend authorization remains authoritative for every update.</span>
          <div>
            <Button asChild variant="ghost">
              <Link to="/">Cancel</Link>
            </Button>
            <Button
              type="submit"
              loading={updateState.isLoading}
              icon={<Save aria-hidden="true" size={17} />}
            >
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function SettingsField({
  id,
  label,
  value,
  onChange,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <FormField htmlFor={id} label={label} required={required}>
      <Input
        id={id}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormField>
  );
}
