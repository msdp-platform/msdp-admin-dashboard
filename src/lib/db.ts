import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __msdp_admin_pool: Pool | undefined;
}

export function getPool() {
  if (global.__msdp_admin_pool) return global.__msdp_admin_pool;
  const conn = process.env.DATABASE_URL;
  if (!conn) {
    console.warn("DATABASE_URL is not set - using mock data");
    return null;
  }
  const pool = new Pool({
    connectionString: conn,
    ssl: false, // Disable SSL for local development
  });
  global.__msdp_admin_pool = pool;
  return pool;
}
