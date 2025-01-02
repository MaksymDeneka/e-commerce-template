import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('gf_user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
});

export type User = typeof users.$inferSelect;

export default users;
