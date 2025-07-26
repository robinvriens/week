import { fastifyAutoload } from '@fastify/autoload';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fastifyHealthcheck from 'fastify-healthcheck';
import path from 'path';

import { routes } from './utils/route-builder.js';

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
    dir: path.join(import.meta.dirname, 'plugins'),
    options: { ...opts },
  });

  await fastify.register(fastifyHealthcheck, { prefix: '/api' });

  await fastify.register(routes, {
    dir: path.join(import.meta.dirname, 'modules'),
    prefix: '/api',
  });
}
