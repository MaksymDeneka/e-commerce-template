import { index, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import  users  from './users';


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

export default sessions;
