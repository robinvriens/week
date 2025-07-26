import type { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return reply.send({ message: 'User routes loaded dynamically!' });
  });

  fastify.get('/profile', async (request, reply) => {
    return reply.send({ message: 'User profile endpoint' });
  });
}
