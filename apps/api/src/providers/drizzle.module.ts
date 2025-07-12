import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection } from '@workspace/db';
import { DRIZZLE_DB_CONNECTION } from './drizzle.connection';

@Module({
  providers: [
    {
      provide: DRIZZLE_DB_CONNECTION,
      useFactory: async (configService: ConfigService) => {
        return createConnection({
          databaseUrl: configService.getOrThrow('DATABASE_URL'),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DRIZZLE_DB_CONNECTION],
})
export class DrizzleModule {}
