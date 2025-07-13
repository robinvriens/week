import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { defaultTimestamps } from '../helpers/timestamp';
import { relations } from 'drizzle-orm';
import { workspaceMember } from './workspace';

export const user = pgTable('user', {
  id: uuid().defaultRandom().primaryKey(),
  email: text().notNull().unique(),
  password: text().notNull(),
  ...defaultTimestamps(),
});

export const userRelations = relations(user, ({ many }) => ({
  workspaces: many(workspaceMember),
}));
