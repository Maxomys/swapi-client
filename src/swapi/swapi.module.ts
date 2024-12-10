import { Module } from '@nestjs/common';
import { SwapiClient } from './swapi.client';
import { HttpModule } from '@nestjs/axios';
import { SwapiService } from './swapi.service';

@Module({
  imports: [HttpModule],
  providers: [SwapiClient, SwapiService],
  exports: [SwapiService],
})
export class SwapiModule {}
