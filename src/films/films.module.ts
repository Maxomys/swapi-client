import { Module } from '@nestjs/common';
import { FilmsResolver } from './films.resolver';
import { SwapiModule } from 'src/swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [FilmsResolver]
})
export class FilmsModule {}
