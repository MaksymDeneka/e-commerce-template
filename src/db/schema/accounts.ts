import { index, pgTable, serial, text } from 'drizzle-orm/pg-core';
import users from './users';
import { accountTypeEnum, roleEnum } from './enums';

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

export type Account = typeof accounts.$inferSelect;

export default accounts;
