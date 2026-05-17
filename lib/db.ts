import { Pool } from "pg";

let _pool: Pool | undefined;

function getPool(): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: process.env.DATABASE_URL!, max: 1 });
  }
  return _pool;
}

export async function sql<T = Record<string, unknown>>(
  query: string,
  params?: unknown[]
): Promise<T[]> {
  const { rows } = await getPool().query(query, params);
  return rows as T[];
}

export interface WaitlistRow {
  id:           string;
  nombre:       string;
  email:        string;
  telefono:     string | null;
  para_quien:   string;
  plan_interes: string | null;
  fuente:       string | null;
  utm_medium:   string | null;
  utm_campaign: string | null;
  referrer:     string | null;
  ip_hash:      string | null;
  estado:       string;
  notas:        string | null;
  rgpd:         boolean;
  rgpd_at:      Date;
  createdAt:    Date;
}

export interface ContactMessageRow {
  id:        string;
  nombre:    string;
  email:     string;
  mensaje:   string;
  ip_hash:   string | null;
  leido:     boolean;
  rgpd:      boolean;
  createdAt: Date;
}
