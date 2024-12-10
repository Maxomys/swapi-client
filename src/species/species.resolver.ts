import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Species } from './species.model';
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';
import { Planet } from 'src/planets/planet.model';
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
      await this.swapiService.getPlanets(undefined, { filterType: 'species', filterValue: this.getId(species) })
    )[0];
  }

  @ResolveField(() => [Film])
  async films(@Root() species: Species): Promise<Film[]> {
    return this.swapiService.getFilms(undefined, { filterType: 'species', filterValue: this.getId(species) });
  }

  @ResolveField(() => [Person])
  async people(@Root() species: Species): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'species', filterValue: this.getId(species) });
  }

  private getId(species: Species) {
    return species.url.split('/').splice(-2, 1)[0];
  }
}