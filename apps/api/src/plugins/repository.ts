import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { createConnection } from '@workspace/db';

declare module 'fastify' {
  interface FastifyInstance {
    repository: any; // TODO: fix this
  }
}

type RepositoryOptions = {
  databaseUrl: string;
};

export const repositoryPlugin = fp(
  (fastify: FastifyInstance, options: RepositoryOptions) => {
    const repository = createConnection({ databaseUrl: options.databaseUrl });
    fastify.decorate('repository', repository);
  },
);
