import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import users from './users';


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

export type Profile = typeof profiles.$inferSelect;

export default profiles;