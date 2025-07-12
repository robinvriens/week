import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export interface DatabaseClientOptions {
  databaseUrl: string;
}

export type DatabaseInstance = NodePgDatabase<typeof schema>;

export function createConnection({
  databaseUrl,
}: DatabaseClientOptions): DatabaseInstance {
  const pool = new Pool({
    connectionString: databaseUrl,
  });

  return drizzle(pool, {
    schema,
    casing: 'snake_case',
  });
}
