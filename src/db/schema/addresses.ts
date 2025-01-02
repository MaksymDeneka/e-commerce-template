import { index, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import users from './users';

export const addresses = pgTable(
  'gf_addresses',
  {
    id: serial('id').primaryKey(),
    userId: serial('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    streetAddress: varchar('street_address', { length: 255 }).notNull(),
    apartment: varchar('apartment', { length: 50 }),
    city: varchar('city', { length: 100 }).notNull(),
    postalCode: varchar('postal_code', { length: 20 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [index('user_address_type_idx').on(table.userId)],
);

export type Address = typeof addresses.$inferSelect;

export default addresses;
