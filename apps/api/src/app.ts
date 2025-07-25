import path from 'path';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyAutoload } from '@fastify/autoload';

export const options = {
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all',
    },
  },
};

export async function app(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins/external'),
    options: { ...opts },
  });
}
