import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRepository } from './log.repository';

@Module({
  controllers: [LogController],
  imports: [TypeOrmModule.forFeature([LogRepository])],
  providers: [LogService],
})
export class LogModule {}
