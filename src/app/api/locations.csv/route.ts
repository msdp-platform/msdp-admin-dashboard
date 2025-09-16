import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getPool();
    const q = `
      select country_code, country_name, city_slug, city_name, available_categories, active
      from locations
      order by country_code, city_slug
    `;
    const { rows } = await pool.query(q);
    const header = 'country_code,country_name,city_slug,city_name,available_categories,active';
    const body = rows.map((r: any) => {
      const cats = Array.isArray(r.available_categories) ? r.available_categories.join(';') : '';
      return [r.country_code, r.country_name, r.city_slug, r.city_name, cats, r.active ? 'true' : 'false']
        .map((v: string) => String(v ?? '').replaceAll('"', '""'))
        .map((v: string) => /[,\n"]/.test(v) ? `"${v}"` : v)
        .join(',');
    }).join('\n');
    const csv = `${header}\n${body}`;
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="locations.csv"`
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: 'DB error' }, { status: 500 });
  }
}

