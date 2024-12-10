import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PeopleModule } from './star-wars/people/people.module';
import { FilmsModule } from './star-wars/films/films.module';
import { StarshipsModule } from './star-wars/starships/starships.module';
import { VehiclesModule } from './star-wars/vehicles/vehicles.module';
import { SpeciesModule } from './star-wars/species/species.module';
import { PlanetsModule } from './star-wars/planets/planets.module';
import { SwapiModule } from './swapi/swapi.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { AnalysisModule } from './star-wars/analysis/analysis.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      playground: true,
    }),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PeopleModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule,
    SwapiModule,
    AnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
