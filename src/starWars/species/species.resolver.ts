import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Species } from './species.model';
import { Film } from 'src/starWars/films/film.model';
import { Person } from 'src/starWars/people/person.model';
import { Planet } from 'src/starWars/planets/planet.model';
import { SwapiService } from 'src/swapi/swapi.service';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Species, { description: 'Fetch a species by id.' })
  async singleSpecies(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getSpeciesById(id.toString());
  }

  @Query(() => [Species], { description: 'Fetch all species.' })
  async species(): Promise<Species[]> {
    return this.swapiService.getSpecies();
  }

  @ResolveField(() => Planet)
  async homeworld(@Root() species: Species): Promise<Planet | null> {
    return (
      await this.swapiService.getPlanets(undefined, { filterType: 'species', filterValue: species.getId() })
    )[0];
  }

  @ResolveField(() => [Film])
  async films(@Root() species: Species): Promise<Film[]> {
    return this.swapiService.getFilms(undefined, { filterType: 'species', filterValue: species.getId() });
  }

  @ResolveField(() => [Person])
  async people(@Root() species: Species): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'species', filterValue: species.getId() });
  }
}
