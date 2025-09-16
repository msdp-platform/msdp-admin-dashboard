"use client";

import { useEffect, useMemo, useState } from "react";

type LocationRow = {
  countryCode: string;
  countryName: string;
  citySlug: string;
  cityName: string;
  availableCategories: string[];
  active: boolean;
};

const ALL_CATEGORIES = ["food","grocery","pharmacy","cleaning","repairs","other"] as const;

export default function LocationsAdminPage() {
  const [rows, setRows] = useState<LocationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{ countryCode: string; countryName: string; cityName: string; citySlug: string; availableCategories: string[]; active: boolean}>({ countryCode: '', countryName: '', cityName: '', citySlug: '', availableCategories: [], active: true });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function refresh() {
    setLoading(true);
    fetch('/api/locations').then(r=>r.json()).then(d => setRows(d.locations || [])).finally(()=>setLoading(false));
  }

  useEffect(()=>{ refresh(); }, []);

  function sanitizeSlug(input: string) {
    return (input || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.countryCode) e.countryCode = 'Required';
    if (form.countryCode && form.countryCode.length !== 2) e.countryCode = 'Use 2-letter code (e.g., GB)';
    if (!form.countryName) e.countryName = 'Required';
    if (!form.cityName) e.cityName = 'Required';
    const slug = form.citySlug || sanitizeSlug(form.cityName);
    if (!slug) e.citySlug = 'Slug required';
    if (form.availableCategories?.some(c => !ALL_CATEGORIES.includes(c as any))) e.availableCategories = 'Invalid category present';
    return e;
  }, [form]);

  const canSave = useMemo(()=> Object.keys(errors).length === 0, [errors]);

  function updateForm<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSave) return;
    setSaving(true);
    const payload = { ...form, citySlug: form.citySlug || sanitizeSlug(form.cityName) };
    await fetch('/api/locations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(async r => {
        if (!r.ok) {
          const data = await r.json().catch(() => ({}));
          throw new Error(data?.message || 'Failed to save');
        }
        setForm({ countryCode: '', countryName: '', cityName: '', citySlug: '', availableCategories: [], active: true });
        setMsg({ type: 'success', text: 'Location saved' });
        refresh();
      })
      .catch(err => setMsg({ type: 'error', text: err.message }))
      .finally(()=> setSaving(false));
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Locations</h1>
      <p className="mt-1 text-gray-600">Create and manage serviceable locations. Enabling a location makes it selectable in the customer app.</p>

      {msg && (
        <div className={`mt-4 rounded-md border px-4 py-3 text-sm ${msg.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`}>
          <div className="flex items-start justify-between gap-3">
            <span>{msg.text}</span>
            <button className="text-current/70" onClick={()=>setMsg(null)}>Dismiss</button>
          </div>
        </div>
      )}

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Add / Update Location</h2>
        {/* Quick actions */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <a href="/api/locations.csv" className="text-sm text-indigo-600 hover:text-indigo-700">Download CSV</a>
          <CSVImport onImported={(ok, text)=> setMsg({ type: ok ? 'success' : 'error', text })} />
        </div>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Code</label>
            <input value={form.countryCode} onChange={e=>updateForm('countryCode', e.target.value.toUpperCase())} placeholder="GB" className={`mt-1 w-full rounded-md border px-3 py-2 ${errors.countryCode ? 'border-red-300' : 'border-gray-300'}`} />
            {errors.countryCode && <p className="mt-1 text-xs text-red-600">{errors.countryCode}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country Name</label>
            <input value={form.countryName} onChange={e=>updateForm('countryName', e.target.value)} placeholder="United Kingdom" className={`mt-1 w-full rounded-md border px-3 py-2 ${errors.countryName ? 'border-red-300' : 'border-gray-300'}`} />
            {errors.countryName && <p className="mt-1 text-xs text-red-600">{errors.countryName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City Name</label>
            <input value={form.cityName} onChange={e=>updateForm('cityName', e.target.value)} placeholder="London" className={`mt-1 w-full rounded-md border px-3 py-2 ${errors.cityName ? 'border-red-300' : 'border-gray-300'}`} />
            {errors.cityName && <p className="mt-1 text-xs text-red-600">{errors.cityName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City Slug</label>
            <input value={form.citySlug} onChange={e=>updateForm('citySlug', e.target.value)} onBlur={(e)=> updateForm('citySlug', sanitizeSlug(e.target.value || form.cityName))} placeholder="london" className={`mt-1 w-full rounded-md border px-3 py-2 ${errors.citySlug ? 'border-red-300' : 'border-gray-300'}`} />
            {errors.citySlug && <p className="mt-1 text-xs text-red-600">{errors.citySlug}</p>}
            <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate from city name.</p>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Available Categories</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {ALL_CATEGORIES.map(c => (
                <label key={c} className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={form.availableCategories.includes(c)} onChange={(e)=>{
                    const checked = e.target.checked;
                    updateForm('availableCategories', checked ? Array.from(new Set([...(form.availableCategories||[]), c])) : (form.availableCategories||[]).filter(x=>x!==c));
                  }} />
                  {c}
                </label>
              ))}
            </div>
            {errors.availableCategories && <p className="mt-1 text-xs text-red-600">{errors.availableCategories}</p>}
          </div>
          <div>
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.active} onChange={e=>updateForm('active', e.target.checked)} /> Active
            </label>
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <button disabled={!canSave || saving} className="rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving...' : 'Save Location'}</button>
          </div>
        </form>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Locations</h2>
          <button onClick={refresh} className="text-sm text-indigo-600">Refresh</button>
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Categories</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td className="px-4 py-3" colSpan={4}>Loading...</td></tr>
              )}
              {!loading && rows.map((r) => (
                <tr key={`${r.countryCode}-${r.citySlug}`} className="border-t">
                  <td className="px-4 py-2 font-medium text-gray-900">{r.countryName} ({r.countryCode})</td>
                  <td className="px-4 py-2">{r.cityName} <span className="text-xs text-gray-500">/{r.citySlug}</span></td>
                  <td className="px-4 py-2">{r.availableCategories.join(', ')}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${r.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.active ? 'Enabled' : 'Disabled'}</span>
                  </td>
                  <td className="px-4 py-2 space-x-3">
                    <button
                      className="text-sm text-gray-700"
                      onClick={()=>{
                        // Duplicate: prefill form with row values (clear city fields for safety)
                        setForm({
                          countryCode: r.countryCode,
                          countryName: r.countryName,
                          cityName: '',
                          citySlug: '',
                          availableCategories: r.availableCategories,
                          active: r.active,
                        });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setMsg({ type: 'success', text: `Prefilled form from ${r.cityName}. Enter new city details and save.` });
                      }}
                    >Duplicate</button>
                    <button
                      className="text-sm text-indigo-600"
                      onClick={async ()=>{
                        await fetch(`/api/locations/${r.countryCode.toLowerCase()}/${r.citySlug}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !r.active }) });
                        refresh();
                      }}
                    >{r.active ? 'Disable' : 'Enable'}</button>
                    <button
                      className="text-sm text-red-600"
                      onClick={async ()=>{
                        if (!confirm(`Delete ${r.cityName}, ${r.countryCode}?`)) return;
                        await fetch(`/api/locations/${r.countryCode.toLowerCase()}/${r.citySlug}`, { method: 'DELETE' });
                        refresh();
                      }}
                    >Delete</button>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 && (
                <tr><td className="px-4 py-3 text-gray-600" colSpan={4}>No locations found. Add one above.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
