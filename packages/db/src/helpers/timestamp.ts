import { timestamp } from 'drizzle-orm/pg-core';

export const defaultTimestamps = (options?: {
  createdAt?: boolean;
  updatedAt?: boolean;
}) => {
  const { createdAt = true, updatedAt = true } = options || {};

  return {
    ...(createdAt && {
      createdAt: timestamp('created_at', { mode: 'date', precision: 3 })
        .defaultNow()
        .notNull(),
    }),
    ...(updatedAt && {
      updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    }),
  };
};
