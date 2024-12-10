import { Module } from '@nestjs/common';
import { PlanetsResolver } from './planets.resolver';
import { SwapiModule } from 'src/swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [PlanetsResolver]
})
export class PlanetsModule {}
