import { Module } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      playground: true,
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
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
  providers: [AppService],
})
export class AppModule {}
