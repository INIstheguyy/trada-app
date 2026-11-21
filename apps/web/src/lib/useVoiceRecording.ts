import { useEffect, useRef, useState } from 'react';
import { getMicrophoneErrorMessage, getSupportedAudioMimeType } from './voiceRecording';

type VoiceRecordingPreview = {
  blob: Blob;
  durationSeconds: number;
  mimeType: string;
  url: string;
};

export function useVoiceRecording(options?: {
  noSupportMessage?: string;
  noAudioMessage?: string;
  noMicMessage?: string;
}) {
  const noSupportMsg =
    options?.noSupportMessage ??
    'Voice recording is not supported in this browser. Type your description instead.';
  const noAudioMsg =
    options?.noAudioMessage ??
    'No audio was captured. Try recording again or type your description instead.';
  const noMicMsg =
    options?.noMicMessage ??
    'We could not access your microphone. Allow microphone access or type your description instead.';

  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [audioPreview, setAudioPreview] = useState<VoiceRecordingPreview>();
  const [error, setError] = useState<string>();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef<number | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!isRecording) return;
    const timer = window.setInterval(() => {
      setElapsed(
        Math.max(0, Math.floor((Date.now() - (startedAtRef.current ?? Date.now())) / 1000)),
      );
    }, 250);
    return () => window.clearInterval(timer);
  }, [isRecording]);

  function discard() {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setAudioPreview(undefined);
  }

  async function start() {
    if (
      window.isSecureContext === false ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === 'undefined'
    ) {
      setError(noSupportMsg);
      return;
    }

    setError(undefined);
    discard();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const preferredMimeType = getSupportedAudioMimeType();
      const recorder = preferredMimeType
        ? new MediaRecorder(stream, { mimeType: preferredMimeType })
        : new MediaRecorder(stream);
      chunksRef.current = [];
      startedAtRef.current = Date.now();
      setElapsed(0);
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = recorder;

      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      });
      recorder.addEventListener('stop', () => {
        const mimeType = recorder.mimeType || preferredMimeType || 'audio/webm';
        const recording = new Blob(chunksRef.current, { type: mimeType });
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        setIsRecording(false);
        const durationSeconds = Math.max(
          1,
          Math.round((Date.now() - (startedAtRef.current ?? Date.now())) / 1000),
        );
        setElapsed(durationSeconds);
        if (recording.size === 0) {
          setError(noAudioMsg);
          return;
        }
        const url = URL.createObjectURL(recording);
        previewUrlRef.current = url;
        setAudioPreview({
          blob: recording,
          durationSeconds,
          mimeType: recording.type || 'audio/webm',
          url,
        });
      });
      recorder.start(1_000);
      setIsRecording(true);
    } catch (error) {
      setError(getMicrophoneErrorMessage(error, noMicMsg));
    }
  }

  function stop() {
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
  }

  return { isRecording, elapsed, audioPreview, error, setError, start, stop, discard };
}
