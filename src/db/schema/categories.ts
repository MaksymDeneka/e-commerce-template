import { boolean, index, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const categories = pgTable(
  'gf_categories',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    // parentId: integer('parent_id').references(() => categories.id, { onDelete: 'set null' }),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    // index('category_parent_idx').on(table.parentId),
    index('category_slug_idx').on(table.slug),
  ],
);

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export default categories;
