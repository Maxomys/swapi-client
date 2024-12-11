import { Module } from '@nestjs/common';
import { VehiclesResolver } from './vehicles.resolver';
import { SwapiModule } from 'src/swapi/swapi.module';

@Module({
  imports: [SwapiModule],
  providers: [VehiclesResolver],
})
export class VehiclesModule {}
