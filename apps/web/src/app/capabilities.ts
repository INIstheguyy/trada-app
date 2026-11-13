export type CapabilityStatus =
  'available' | 'contract-blocked' | 'product-unapproved' | 'separate-track';

type Capability = {
  reason: string;
  status: CapabilityStatus;
};

export const capabilities = {
  emailPasswordAuth: {
    status: 'available',
    reason: 'Registration, login, refresh and profile contracts are implemented.',
  },
  businessWorkspace: {
    status: 'available',
    reason: 'Business resolution, creation and update contracts are implemented.',
  },
  ownerOverview: {
    status: 'available',
    reason: 'Composed sales analytics, low-stock and recent-sales data are implemented.',
  },
  inventory: {
    status: 'available',
    reason: 'Product catalog and low-stock contracts are implemented.',
  },
  sales: {
    status: 'available',
    reason: 'Sale checkout, history, detail, cancellation and analytics are implemented.',
  },
  businessSettings: {
    status: 'available',
    reason: 'Business identity update is implemented; publication remains unavailable.',
  },
  staffRbac: {
    status: 'contract-blocked',
    reason: 'Membership, invitations and the final permission matrix are not documented.',
  },
  customerDebtors: {
    status: 'contract-blocked',
    reason: 'A customer ledger and follow-up payment lifecycle are not documented.',
  },
  inventoryMovements: {
    status: 'contract-blocked',
    reason: 'Stock movement, adjustment, count and approval contracts are unavailable.',
  },
  aiCapture: {
    status: 'contract-blocked',
    reason: 'Draft, confidence, correction and confirmation contracts are unavailable.',
  },
  storefront: {
    status: 'contract-blocked',
    reason: 'Publication eligibility, visibility and commerce contracts are unavailable.',
  },
  subscriptions: {
    status: 'contract-blocked',
    reason: 'Trial, billing, renewal and expiry behavior are unresolved.',
  },
  bnpl: {
    status: 'product-unapproved',
    reason: 'Partner availability, eligibility and status contracts are unconfirmed.',
  },
  adminPortal: {
    status: 'separate-track',
    reason: 'The internal operations portal requires its own scope, identity, RBAC and APIs.',
  },
} as const satisfies Record<string, Capability>;

export type CapabilityId = keyof typeof capabilities;

export function isCapabilityAvailable(capability: CapabilityId) {
  return capabilities[capability].status === 'available';
}
