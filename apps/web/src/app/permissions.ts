export type Action =
  | 'dashboard:view'
  | 'sale:view'
  | 'sale:create'
  | 'sale:cancel'
  | 'sales:analytics'
  | 'approval:review'
  | 'margin:view'
  | 'business:update'
  | 'product:view'
  | 'product:create'
  | 'product:update'
  | 'product:delete';
export type Role = 'user' | 'owner' | 'manager' | 'staff';

const permissions: Record<Role, ReadonlySet<Action>> = {
  // The backend currently returns only "user". Dashboard access is provisional
  // until business membership and the production permission matrix are documented.
  user: new Set([
    'dashboard:view',
    'sale:view',
    'sale:create',
    'sales:analytics',
    'business:update',
    'product:view',
    'product:create',
    'product:update',
  ]),
  owner: new Set([
    'dashboard:view',
    'sale:create',
    'sale:view',
    'sale:cancel',
    'sales:analytics',
    'approval:review',
    'margin:view',
    'business:update',
    'product:view',
    'product:create',
    'product:update',
    'product:delete',
  ]),
  manager: new Set([
    'dashboard:view',
    'sale:create',
    'sale:view',
    'sales:analytics',
    'approval:review',
    'product:view',
    'product:create',
    'product:update',
  ]),
  staff: new Set(['sale:view', 'sale:create', 'product:view']),
};

export function can(role: Role, action: Action) {
  return permissions[role].has(action);
}

export function normalizeRole(role: string): Role {
  return role === 'owner' || role === 'manager' || role === 'staff' ? role : 'user';
}
