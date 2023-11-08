import { Module } from '@nestjs/common';
import { Postgres } from './postgres';

@Module({
  providers: [...Postgres],
  exports: [...Postgres],
})
export class PostgresModule {}
