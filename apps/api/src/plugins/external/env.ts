import env from '@fastify/env';

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

export const autoConfig = {
  confKey: 'config',
  schema,
  dotenv: true,
};

export default env;
