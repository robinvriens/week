import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection } from '@workspace/db';

import { DRIZZLE_DB_CONNECTION } from './drizzle.connection';

@Module({
  exports: [DRIZZLE_DB_CONNECTION],
  providers: [
    {
      inject: [ConfigService],
      provide: DRIZZLE_DB_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        return createConnection({
          databaseUrl: configService.getOrThrow('DATABASE_URL'),
        });
      },
    },
  ],
})
export class DrizzleModule {}
