import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Web push subscription schema
export const subscription = sqliteTable('subscription', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	endpoint: text('endpoint').notNull(),
	p256dh: text('p256dh').notNull(),
	auth: text('auth').notNull()
});
