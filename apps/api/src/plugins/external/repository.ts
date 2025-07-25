import type { FastifyInstance } from 'fastify';

import { createConnection, type DatabaseInstance } from '@workspace/db';
import { fastifyPlugin } from 'fastify-plugin';

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
  dependencies: ['env'],
  name: 'repository',
});
