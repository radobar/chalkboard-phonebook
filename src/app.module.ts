import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AccessGuard } from './common/guards/main-auth-guard';
import { HttpExceptionFilter } from './common/http-exception-filter';
import { ContactModule } from './modules/_client/contact/contact.module';
import { ToolsModule } from './modules/_common/tools/tools.module';

export const DEFAULT_TYPEORM_CONFIG: object = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DEFAULT_TYPEORM_CONFIG,
      cli: {
        entitiesDir: __dirname + '/entity',
        migrationsDir: __dirname + '/migration',
      },
      entities: [__dirname + '/entity/*{.ts,.js}'],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ToolsModule,
    ContactModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
