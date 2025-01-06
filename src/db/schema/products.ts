import {
  boolean,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import categories from './categories';

export const products = pgTable(
  'gf_products',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    price: doublePrecision('price').notNull(),
    compareAtPrice: doublePrecision('compare_at_price'),
    quantity: integer('quantity').notNull().default(0),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'restrict' }),
    isPublished: boolean('is_published').default(false).notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('product_category_idx').on(table.categoryId),
    index('product_slug_idx').on(table.slug),
  ],
);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert
export default products;
