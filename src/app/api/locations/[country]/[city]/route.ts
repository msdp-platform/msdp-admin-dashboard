import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

type Params = { params: { country: string; city: string } };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const active: boolean | undefined = body?.active;
    const categories: string[] | undefined = body?.availableCategories;
    if (typeof active === 'undefined' && typeof categories === 'undefined') {
      return NextResponse.json({ ok: false, message: 'Nothing to update' }, { status: 400 });
    }
    const pool = getPool();
    const sets: string[] = [];
    const values: any[] = [];
    if (typeof active !== 'undefined') { sets.push('active = $' + (values.length + 1)); values.push(active); }
    if (typeof categories !== 'undefined') { sets.push('available_categories = $' + (values.length + 1)); values.push(categories); }
    // where keys
    values.push(params.country.toUpperCase());
    values.push(params.city.toLowerCase());
    const q = `update locations set ${sets.join(', ')} where country_code = $${values.length-1} and city_slug = $${values.length} returning country_code as "countryCode", country_name as "countryName", city_slug as "citySlug", city_name as "cityName", available_categories as "availableCategories", active`;
    const { rows } = await pool.query(q, values);
    if (!rows[0]) return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, location: rows[0] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: 'DB error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const pool = getPool();
    const q = `delete from locations where country_code = $1 and city_slug = $2`;
    const { rowCount } = await pool.query(q, [params.country.toUpperCase(), params.city.toLowerCase()]);
    if (!rowCount) return NextResponse.json({ ok: false, message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: 'DB error' }, { status: 500 });
  }
}

