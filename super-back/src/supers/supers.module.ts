import { Module } from '@nestjs/common';
import { SuperService } from './super/super.service';
import { SuperController } from './super/super.controller';

@Module({
  providers: [SuperService],
  controllers: [SuperController],
})
export class SupersModule {}
