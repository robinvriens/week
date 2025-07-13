import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { defaultTimestamps } from '../helpers/timestamp';
import { relations } from 'drizzle-orm';

import { project } from './project';
import { user } from './user';

export const workspace = pgTable('workspace', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  ...defaultTimestamps(),
});

export const workspaceMember = pgTable('workspace_member', {
  id: uuid().defaultRandom().primaryKey(),
  workspaceId: uuid()
    .references(() => workspace.id)
    .notNull(),
  userId: uuid()
    .references(() => user.id)
    .notNull(),
  ...defaultTimestamps(),
});

export const workspaceRelations = relations(workspace, ({ many }) => ({
  projects: many(project),
  members: many(workspaceMember),
}));

export const workspaceMemberRelations = relations(
  workspaceMember,
  ({ one }) => ({
    workspace: one(workspace, {
      fields: [workspaceMember.workspaceId],
      references: [workspace.id],
    }),
    user: one(user, {
      fields: [workspaceMember.userId],
      references: [user.id],
    }),
  }),
);
