import { fastifyPlugin } from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { type DatabaseInstance, createConnection } from '@workspace/db';

declare module 'fastify' {
  interface FastifyInstance {
    repository: DatabaseInstance;
  }
}

function repository(fastify: FastifyInstance) {
  const repository = createConnection({
    databaseUrl: fastify.config.DATABASE_URL,
  });
  fastify.decorate('repository', repository);
}

export default fastifyPlugin(repository, {
  name: 'repository',
  dependencies: ['env'],
});
