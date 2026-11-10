type ApiErrorShape = {
  status?: number | string;
  data?: unknown;
  error?: string;
};

export function readApiError(reason: unknown, fallback: string) {
  if (!isApiError(reason)) return fallback;

  if (reason.status === 401) return 'Your session has expired. Sign in again to continue.';
  if (reason.status === 403) return 'You do not have permission to perform this action.';
  if (reason.status === 'FETCH_ERROR' || reason.status === 'TIMEOUT_ERROR')
    return 'We could not reach Trada. Check your connection and try again.';
  if (reason.status === 'PARSING_ERROR' || reason.status === 'CUSTOM_ERROR')
    return 'Trada received a response it could not verify. Try again or contact support.';

  const message = messageFromData(reason.data);
  return message ?? fallback;
}

function isApiError(reason: unknown): reason is ApiErrorShape {
  return typeof reason === 'object' && reason !== null;
}

function messageFromData(data: unknown) {
  if (typeof data !== 'object' || data === null || !('message' in data)) return undefined;
  const message = (data as { message?: unknown }).message;
  return typeof message === 'string' && message.trim() ? message : undefined;
}
