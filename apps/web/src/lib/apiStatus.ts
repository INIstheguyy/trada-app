export function apiStatus(error: unknown) {
  if (typeof error !== 'object' || error === null || !('status' in error)) return undefined;
  return (error as { status?: number | string }).status;
}
