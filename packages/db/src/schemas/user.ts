import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { defaultTimestamps } from '../helpers/timestamp';

export const user = pgTable('user', {
  id: uuid().defaultRandom().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  ...defaultTimestamps(),
});
