import fastify from 'fastify';
import fp from 'fastify-plugin';
import { app } from './app.js';

const server = fastify();

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

init();
