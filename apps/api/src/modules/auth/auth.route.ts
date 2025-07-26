import type { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  fastify.get('/github/login', async (request, reply) => {
    const uri = await fastify.githubOAuth2.generateAuthorizationUri(
      request,
      reply,
    );
    return reply.redirect(uri);
  });

  fastify.get('/github/callback', async (request, reply) => {
    const token =
      await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request,
        reply,
      );
    return reply.send(token);
  });
}
