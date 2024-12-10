import { Module } from '@nestjs/common';
import { SpeciesResolver } from './species.resolver';
import { SwapiModule } from 'src/swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [SpeciesResolver]
})
export class SpeciesModule {}
