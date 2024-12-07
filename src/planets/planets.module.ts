import { Module } from '@nestjs/common';
import { PlanetsResolver } from './planets.resolver';

@Module({
  providers: [PlanetsResolver]
})
export class PlanetsModule {}
