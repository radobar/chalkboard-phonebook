import { Module } from '@nestjs/common';

import { UserToolsService } from './services/userTools.service';

@Module({
  exports: [UserToolsService],
  providers: [UserToolsService],
})
export class ToolsModule {}
