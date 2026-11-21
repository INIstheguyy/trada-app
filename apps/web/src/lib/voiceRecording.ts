const supportedAudioMimeTypes = [
  'audio/webm;codecs=opus',
  'audio/mp4;codecs=mp4a.40.2',
  'audio/mp4',
  'audio/webm',
  'audio/ogg;codecs=opus',
  'audio/ogg',
];

/** Selects a container the current browser can actually record. */
export function getSupportedAudioMimeType() {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') {
    return undefined;
  }

  return supportedAudioMimeTypes.find((mimeType) => MediaRecorder.isTypeSupported(mimeType));
}

export function getMicrophoneErrorMessage(error: unknown, fallback: string) {
  if (!(error instanceof DOMException)) return fallback;

  switch (error.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return window.isSecureContext !== false
        ? 'Microphone access was blocked. Tap Record again and allow microphone access when your browser asks.'
        : 'Microphone recording requires a secure HTTPS connection. Open Trada using HTTPS, then try again.';
    case 'NotFoundError':
      return 'No microphone was found on this device. Connect or enable a microphone, then try again.';
    case 'NotReadableError':
    case 'AbortError':
      return 'Your microphone is busy in another app. Close the other app, then tap Record again.';
    case 'NotSupportedError':
      return 'This browser cannot start an audio recording. Type the description instead.';
    default:
      return fallback;
  }
}
