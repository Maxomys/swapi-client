import { Module } from '@nestjs/common';
import { StarshipsResolver } from './starships.resolver';
import { SwapiModule } from 'src/swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [StarshipsResolver]
})
export class StarshipsModule {}
