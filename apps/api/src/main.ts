import { fastify } from 'fastify';

const app = fastify();

const start = async () => {
  try {
    const address = await app.listen({ port: 4000 });
    console.info(`Server is running at ${address}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
