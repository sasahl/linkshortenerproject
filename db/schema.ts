import { index, integer, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const links = pgTable(
	'links',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		userId: varchar('user_id', { length: 255 }).notNull(),
		shortCode: varchar('short_code', { length: 32 }).notNull(),
		originalUrl: text('original_url').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		// Keep updatedAt timezone-aware; update it from application logic on row updates.
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => ({
		shortCodeUniqueIdx: uniqueIndex('links_short_code_unique_idx').on(table.shortCode),
		userIdIdx: index('links_user_id_idx').on(table.userId),
	}),
);
