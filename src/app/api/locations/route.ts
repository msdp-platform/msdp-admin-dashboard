import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = getPool();
    const q = `
      select country_code as "countryCode",
             country_name as "countryName",
             city_slug    as "citySlug",
             city_name    as "cityName",
             available_categories as "availableCategories",
             active
      from locations
      order by country_code, city_slug
    `;
    const { rows } = await pool.query(q);
    return NextResponse.json({ ok: true, locations: rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: 'DB error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const countryCode: string = body?.countryCode?.toUpperCase();
    const countryName: string = body?.countryName;
    const cityName: string = body?.cityName;
    const citySlug: string = (body?.citySlug || cityName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const availableCategories: string[] = Array.isArray(body?.availableCategories) ? body.availableCategories : [];
    const active: boolean = body?.active ?? true;

    if (!countryCode || !countryName || !cityName || !citySlug) {
      return NextResponse.json({ ok: false, message: 'Missing required fields' }, { status: 400 });
    }

    const pool = getPool();
    const q = `
      insert into locations (country_code, country_name, city_slug, city_name, available_categories, active)
      values ($1,$2,$3,$4,$5,$6)
      on conflict (country_code, city_slug) do update
        set country_name = excluded.country_name,
            city_name = excluded.city_name,
            available_categories = excluded.available_categories,
            active = excluded.active
      returning country_code as "countryCode",
                country_name as "countryName",
                city_slug    as "citySlug",
                city_name    as "cityName",
                available_categories as "availableCategories",
                active;
    `;
    const { rows } = await pool.query(q, [countryCode, countryName, citySlug, cityName, availableCategories, active]);
    return NextResponse.json({ ok: true, location: rows[0] }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: 'DB error' }, { status: 500 });
  }
}

