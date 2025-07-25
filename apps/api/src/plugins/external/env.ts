import { fastifyPlugin } from 'fastify-plugin';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { fastifyEnv } from '@fastify/env';

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: string;
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
    };
  }
}

const schema = {
  type: 'object',
  required: ['PORT', 'NODE_ENV', 'DATABASE_URL'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    NODE_ENV: {
      type: 'string',
      enum: ['development', 'production'],
      default: 'development',
    },
    DATABASE_URL: {
      type: 'string',
    },
  },
};

async function env(fastify: FastifyInstance, options: FastifyPluginOptions) {
  await fastify.register(fastifyEnv, {
    confKey: 'config',
    schema,
    dotenv: true,
  });
}

export default fastifyPlugin(env, {
  name: 'env',
});
