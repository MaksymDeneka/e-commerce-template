import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/db/schema/index';

export const database = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
  schema,
});

// let database: PostgresJsDatabase<typeof schema>;
// let pg: ReturnType<typeof postgres>;

// if (env.NODE_ENV === 'production') {
//   pg = postgres(env.DATABASE_URL);
//   database = drizzle(pg, { schema });
// } else {
//   if (!(global as any).database!) {
//     pg = postgres(env.DATABASE_URL);
//     (global as any).database = drizzle(pg, { schema });
//   }
//   database = (global as any).database;
// }

// export { database, pg };
