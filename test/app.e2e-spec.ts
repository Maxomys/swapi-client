import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { filmResponse, filmSearchResponse } from './mock-data';
import { GraphQLModule } from '@nestjs/graphql';
import { PeopleModule } from 'src/star-wars/people/people.module';
import { FilmsModule } from 'src/star-wars/films/films.module';
import { StarshipsModule } from 'src/star-wars/starships/starships.module';
import { VehiclesModule } from 'src/star-wars/vehicles/vehicles.module';
import { SpeciesModule } from 'src/star-wars/species/species.module';
import { PlanetsModule } from 'src/star-wars/planets/planets.module';
import { SwapiModule } from 'src/swapi/swapi.module';
import { AnalysisModule } from 'src/star-wars/analysis/analysis.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

// e2e tests are using real swapi API
describe('Resolvers (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          driver: ApolloDriver,
          playground: true,
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
    })
      .useMocker((token) => {
        // Inject a mock for every dependency not declared (this avoids lots of unnecessary "imports")
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Star Wars GraphQL Query', () => {
    it('should return a film by id with nested resources', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query Film {
              film(id: 1) {
                created
                edited
                url
                title
                episode_id
                opening_crawl
                director
                producer
                release_date
                species {
                  created
                  edited
                  url
                  name
                  classification
                  designation
                  average_height
                  average_lifespan
                  eye_colors
                  hair_colors
                  skin_colors
                  language
                }
                starships {
                  created
                  edited
                  url
                  name
                  model
                  starship_class
                  manufacturer
                  cost_in_credits
                  length
                  crew
                  passengers
                  max_atmosphering_speed
                  hyperdrive_rating
                  MGLT
                  cargo_capacity
                  consumables
                }
                characters {
                  created
                  edited
                  url
                  name
                  birth_year
                  eye_color
                  gender
                  hair_color
                  height
                  mass
                  skin_color
                }
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(filmResponse);
        });
    });

    it('should return films with <phantom> in the name', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query Films {
              films(search: "phantom") {
                created
                edited
                url
                title
                episode_id
                opening_crawl
                director
                producer
                release_date
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(filmSearchResponse);
        });
    });

    it('should return not found error for non existent film', async () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query Film {
              film(id: 12) {
                created
                edited
                url
                title
                episode_id
                opening_crawl
                director
                producer
                release_date
              }
            }
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors).toBeInstanceOf(Array);
          expect(res.body.errors).not.toHaveLength(0);
          expect(res.body.errors[0].message).toEqual('Not Found');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
