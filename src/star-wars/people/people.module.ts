import { Module } from '@nestjs/common';
import { PeopleResolver } from './people.resolver';
import { SwapiModule } from 'src/swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [PeopleResolver],
})
export class PeopleModule {}
