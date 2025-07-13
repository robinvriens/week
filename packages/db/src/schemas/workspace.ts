import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { defaultTimestamps } from '../helpers/timestamp';

export const workspace = pgTable('workspace', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  ...defaultTimestamps(),
});
