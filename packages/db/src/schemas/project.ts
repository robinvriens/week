import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { defaultTimestamps } from '../helpers/timestamp';
import { workspace } from './workspace';
import { relations } from 'drizzle-orm';

export const project = pgTable('project', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  workspaceId: uuid()
    .references(() => workspace.id)
    .notNull(),
  ...defaultTimestamps(),
});

export const projectRelations = relations(project, ({ one }) => ({
  workspace: one(workspace, {
    fields: [project.workspaceId],
    references: [workspace.id],
  }),
}));
