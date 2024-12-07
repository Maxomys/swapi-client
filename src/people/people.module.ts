import { Module } from '@nestjs/common';
import { PeopleResolver } from './people.resolver';

@Module({
  providers: [PeopleResolver]
})
export class PeopleModule {}
