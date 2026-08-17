'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Upload and parse are deliberately separate. The upload is what matters —
// once the file is in storage the candidate is captured. If parsing fails
// (Claude outage, odd file), we say so plainly and let the hourly retry cron
// finish the job. We never tell someone their résumé wasn't received when it
// was.
export type UploadStage = 'idle' | 'uploading' | 'parsing' | 'queued' | 'done';

export function useResumeUpload() {
  const router = useRouter();
  const [stage, setStage] = useState<UploadStage>('idle');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const busy = stage === 'uploading' || stage === 'parsing';

  const stageLabel: Record<UploadStage, string> = {
    idle: 'Choose your résumé — PDF, DOCX, or TXT',
    uploading: 'Uploading…',
    parsing: 'Reading your résumé…',
    queued: 'Received — matching shortly',
    done: 'Done — loading your matches',
  };

  async function withRetry(fn: () => Promise<Response>, attempts = 3) {
    let lastError: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fn();
        // Retry transient server errors; surface client errors immediately.
        if (res.status >= 500 && i < attempts - 1) {
          await new Promise((r) => setTimeout(r, 800 * (i + 1)));
          continue;
        }
        return res;
      } catch (e) {
        lastError = e;
        if (i < attempts - 1) {
          await new Promise((r) => setTimeout(r, 800 * (i + 1)));
        }
      }
    }
    throw lastError ?? new Error('Network unavailable');
  }

  async function upload(file: File) {
    setError(null);
    setNotice(null);
    setStage('uploading');

    // --- Step 1: get the file safely stored. This is the critical path. ---
    let resumeId: string;
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await withRetry(() =>
        fetch('/api/resumes', { method: 'POST', body: form }),
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Upload failed');
      }
      resumeId = (await res.json()).id;
    } catch (e) {
      setError(
        e instanceof Error
          ? `${e.message} — your résumé was not saved. Please try again.`
          : 'Upload failed — your résumé was not saved. Please try again.',
      );
      setStage('idle');
      return;
    }

    // --- Step 2: parse. Failure here is recoverable, not fatal. ---
    setStage('parsing');
    try {
      const res = await withRetry(() =>
        fetch(`/api/resumes/${resumeId}/parse`, { method: 'POST' }),
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        // 422 means the document itself is the problem — the user can fix it.
        if (res.status === 422) {
          setNotice(
            body.error ??
              'We saved your résumé but could not read it. If it is a scanned image, send a text-based copy.',
          );
        } else {
          setNotice(
            'Your résumé is safely received. Matching is running behind right now — your matches will appear here shortly, no action needed.',
          );
        }
        setStage('queued');
        router.refresh();
        return;
      }

      setStage('done');
      router.refresh();
    } catch {
      setNotice(
        'Your résumé is safely received. Matching is running behind right now — your matches will appear here shortly, no action needed.',
      );
      setStage('queued');
      router.refresh();
    }
  }

  return { upload, stage, stageLabel: stageLabel[stage], busy, error, notice };
}
