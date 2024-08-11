import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupersModule } from './supers/supers.module';

@Module({
  imports: [SupersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
