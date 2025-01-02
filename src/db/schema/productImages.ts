import { boolean, index, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import products from './products';

export const productImages = pgTable(
  'gf_product_images',
  {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    alt: text('alt'),
    isDefault: boolean('is_default').default(false).notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('product_images_product_idx').on(table.productId),
  ]
);

export type ProductImage = typeof productImages.$inferSelect;
export default productImages;