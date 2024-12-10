import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PeopleModule } from './starWars/people/people.module';
import { FilmsModule } from './starWars/films/films.module';
import { StarshipsModule } from './starWars/starships/starships.module';
import { VehiclesModule } from './starWars/vehicles/vehicles.module';
import { SpeciesModule } from './starWars/species/species.module';
import { PlanetsModule } from './starWars/planets/planets.module';
import { SwapiModule } from './swapi/swapi.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
