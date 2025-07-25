import fastify from 'fastify';
import fp from 'fastify-plugin';

import { app } from './app.js';

const server = fastify({
  logger: {
    transport: {
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'HH:MM:ss Z',
      },
      target: 'pino-pretty',
    },
  },
});

const init = async () => {
  try {
    await server.register(fp(app));
    await server.listen({
      port: parseInt(server.config.PORT),
    });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

await init();
