import type { FastifyInstance } from 'fastify';

import { fastifyOauth2, type OAuth2Namespace } from '@fastify/oauth2';
import { fastifyPlugin } from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }
}

async function oauth2(fastify: FastifyInstance) {
  await fastify.register(fastifyOauth2, {
    callbackUri: fastify.config.GITHUB_CALLBACK_URI,
    credentials: {
      auth: fastifyOauth2.GITHUB_CONFIGURATION,
      client: {
        id: fastify.config.GITHUB_CLIENT_ID,
        secret: fastify.config.GITHUB_CLIENT_SECRET,
      },
    },
    name: 'githubOAuth2',
  });
}

export default fastifyPlugin(oauth2, {
  dependencies: ['env'],
  name: 'oauth2',
});
