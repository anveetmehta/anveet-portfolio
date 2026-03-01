import { defineConfig } from 'drizzle-kit';

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.anveetportfolio_POSTGRES_URL ||
  process.env.DATABASE_URL ||
  '';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
});
