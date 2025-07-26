import type { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.get('/login', async (request, reply) => {
    return reply.send({ message: 'Login route' });
  });
}
