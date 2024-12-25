// import { relations, sql } from 'drizzle-orm';
import {
  index,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);
export const accountTypeEnum = pgEnum('type', ['email', 'google']);

export const users = pgTable('gf_user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull()
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



export type Session = typeof sessions.$inferSelect;