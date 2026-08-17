'use client';

import { useResumeUpload } from '@/hooks/useResumeUpload';

export default function ResumeUploader() {
  const { upload, stageLabel, busy, error, notice } = useResumeUpload();

  return (
    <div>
      <label
        className={`block cursor-pointer border-2 border-dashed px-6 py-10 text-center transition ${
          busy
            ? 'border-slate-300 bg-slate-50 text-slate-400'
            : 'border-brass/50 bg-white text-brass-dark hover:border-brass hover:bg-cream-soft'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        <span className="text-sm font-semibold">{stageLabel}</span>
      </label>

      {/* Hard failure — the file was not saved. */}
      {error && (
        <p className="mt-3 border-l-2 border-rose-400 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      {/* Saved, but matching is delayed. Reassuring, not alarming. */}
      {notice && (
        <p className="mt-3 border-l-2 border-brass bg-cream-soft px-3 py-2 text-sm text-slate-700">
          {notice}
        </p>
      )}
    </div>
  );
}
