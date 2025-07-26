import type { FastifyInstance } from 'fastify';

import { fastifyEnv } from '@fastify/env';
import { fastifyPlugin } from 'fastify-plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      DATABASE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
    };
  }
}

const schema = {
  properties: {
    DATABASE_URL: {
      type: 'string',
    },
    NODE_ENV: {
      default: 'development',
      enum: ['development', 'production'],
      type: 'string',
    },
    PORT: {
      default: '3000',
      type: 'string',
    },
  },
  required: ['PORT', 'NODE_ENV', 'DATABASE_URL'],
  type: 'object',
};

async function env(fastify: FastifyInstance) {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    dotenv: true,
    schema,
  });
}

export default fastifyPlugin(env, {
  name: 'env',
});
