import { Module } from '@nestjs/common';
import { SpeciesResolver } from './species.resolver';

@Module({
  providers: [SpeciesResolver]
})
export class SpeciesModule {}
