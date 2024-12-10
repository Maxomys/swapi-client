import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Planet } from './planet.model';
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';
import { SwapiService } from 'src/swapi/swapi.service';

@Resolver(() => Planet)
export class PlanetsResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Planet, { description: 'Fetch a planet by id.' })
  async planet(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getPlanetById(id.toString());
  }

  @Query(() => [Planet], { description: 'Fetch all planets.' })
  async planets(): Promise<Planet[]> {
    return this.swapiService.getPlanets();
  }

  @ResolveField(() => [Film])
  async films(@Root() planet: Planet): Promise<Film[]> {
    return this.swapiService.getFilms(undefined, { filterType: 'planets', filterValue: this.getId(planet) });
  }

  @ResolveField(() => [Person])
  async residents(@Root() planet: Planet): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'planets', filterValue: this.getId(planet) });
  }

  private getId(planet: Planet) {
    return planet.url.split('/').splice(-2, 1)[0];
  }
}
