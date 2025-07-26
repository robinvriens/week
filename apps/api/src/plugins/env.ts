import type { FastifyInstance } from 'fastify';

import { fastifyEnv } from '@fastify/env';
import { fastifyPlugin } from 'fastify-plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      DATABASE_URL: string;
      GITHUB_CALLBACK_URI: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
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
    GITHUB_CALLBACK_URI: {
      type: 'string',
    },
    GITHUB_CLIENT_ID: {
      type: 'string',
    },
    GITHUB_CLIENT_SECRET: {
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
  required: [
    'PORT',
    'NODE_ENV',
    'DATABASE_URL',
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'GITHUB_CALLBACK_URI',
  ],
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
