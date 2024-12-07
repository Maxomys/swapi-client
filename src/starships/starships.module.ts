import { Module } from '@nestjs/common';
import { StarshipsResolver } from './starships.resolver';

@Module({
  providers: [StarshipsResolver]
})
export class StarshipsModule {}
