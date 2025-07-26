import { FastifyInstance } from 'fastify';
import fs from 'fs/promises';
import path from 'path';

declare module 'fastify' {
  export interface FastifyInstance {
    dir: string;
  }
}

export async function routes(fastify: FastifyInstance, opts: { dir: string }) {
  await dynamicRouteBuilder(fastify, opts.dir);
}

async function dynamicRouteBuilder(fastify: FastifyInstance, dir: string) {
  try {
    const absolutePath = path.resolve(dir);
    const directories = await fs.readdir(absolutePath, { withFileTypes: true });

    for (const directory of directories) {
      if (directory.isDirectory()) {
        const directoryPath = path.join(absolutePath, directory.name);
        const routeFile = path.join(
          directoryPath,
          `${directory.name}.route.js`,
        );

        try {
          await fs.access(routeFile);
          const route = (await import(routeFile)) as {
            default: (fastify: FastifyInstance) => Promise<void> | void;
          };

          if (route.default && typeof route.default === 'function') {
            await fastify.register(route.default, {
              prefix: `/${directory.name}`,
            });

            fastify.log.info(`Registered routes for ${directory.name}`);
          }
        } catch (error: any) {
          if (error.code === 'ENOENT') {
            fastify.log.info(
              `No route file found for ${directory.name}, skipping.`,
            );
          } else {
            fastify.log.error({ err: error }, `Error loading route file`);
          }
        }
      }
    }
  } catch (error: any) {
    fastify.log.error({ err: error }, `Error initializing routes`);
  }
}
