"use client";

import { useRef, useState } from 'react';

export default function CSVImport({ onImported }: { onImported: (ok: boolean, text: string) => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const text = await file.text();
      const res = await fetch('/api/locations/import', {
        method: 'POST',
        headers: { 'Content-Type': 'text/csv' },
        body: text,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.message || 'Import failed');
      onImported(true, `Imported ${data?.summary?.created || 0} created, ${data?.summary?.updated || 0} updated, ${data?.summary?.skipped || 0} skipped.`);
    } catch (e: any) {
      onImported(false, e?.message || 'Import failed');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={(e)=>{ const f=e.target.files?.[0]; if (f) handleFile(f); }} disabled={busy} />
    </div>
  );
}

