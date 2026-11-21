// @vitest-environment jsdom
import { afterEach, expect, test, vi } from 'vitest';
import { getSupportedAudioMimeType } from './voiceRecording';

afterEach(() => vi.unstubAllGlobals());

test('selects Safari-compatible MP4 when WebM is unavailable', () => {
  vi.stubGlobal('MediaRecorder', {
    isTypeSupported: vi.fn((mimeType: string) => mimeType === 'audio/mp4'),
  });

  expect(getSupportedAudioMimeType()).toBe('audio/mp4');
});

test('allows MediaRecorder to choose its default when no advertised type matches', () => {
  vi.stubGlobal('MediaRecorder', { isTypeSupported: vi.fn(() => false) });

  expect(getSupportedAudioMimeType()).toBeUndefined();
});
