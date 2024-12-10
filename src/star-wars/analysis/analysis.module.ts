import { Module } from '@nestjs/common';
import { SwapiModule } from 'src/swapi/swapi.module';
import { AnalysisResolver } from './analysis.resolver';
import { AnalysisService } from './analysis.service';

@Module({
  imports: [SwapiModule],
  providers: [AnalysisResolver, AnalysisService],
})
export class AnalysisModule {}
