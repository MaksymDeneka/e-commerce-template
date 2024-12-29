import { index, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);
export const accountTypeEnum = pgEnum('type', ['email', 'google']);

export const users = pgTable('gf_user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
});

export const accounts = pgTable(
  'gf_accounts',
  {
    id: serial('id').primaryKey(),
    userId: serial('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accountType: accountTypeEnum('accountType').notNull(),
    role: roleEnum('role').notNull(),
    googleId: text('googleId').unique(),
    password: text('password'),
    salt: text('salt'),
  },
  (table) => [index('user_id_account_type_idx').on(table.userId, table.accountType)],
);

export const sessions = pgTable(
  'gf_session',
  {
    id: text('id').primaryKey(),
    userId: serial('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (table) => [index('sessions_user_id_idx').on(table.userId)],
);

export const profiles = pgTable('gf_profiles', {
  id: serial('id').primaryKey(),
  userId: serial('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  // dateOfBirth: timestamp('date_of_birth'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

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

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Addresse = typeof addresses.$inferSelect;
