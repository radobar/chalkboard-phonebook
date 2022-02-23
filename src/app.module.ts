import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UserAccessGuard } from './common/guards/user-auth-guard';
import { HttpExceptionFilter } from './common/http-exception-filter';
import { AuthModule } from './modules/_client/auth/auth.module';
import { UserModule } from './modules/_client/user/user.module';
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
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: UserAccessGuard,
    },
  ],
})
export class AppModule {
  constructor(
    private readonly connection: Connection,
  ) { }
}
