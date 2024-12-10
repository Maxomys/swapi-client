import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Film } from './film.model';
import { Person } from 'src/people/person.model';
import { Planet } from 'src/planets/planet.model';
import { Species } from 'src/species/species.model';
import { Starship } from 'src/starships/starship.model';
import { Vehicle } from 'src/vehicles/vehicle.model';
import { SwapiService } from 'src/swapi/swapi.service';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Film, { description: 'Fetch a film by id.' })
  async film(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getFilmById(id.toString());
  }

  @Query(() => [Film], { description: 'Fetch all films.' })
  async films() {
    return this.swapiService.getFilms();
  }

  @ResolveField(() => [Person])
  async characters(@Root() film: Film): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'films', filterValue: this.getId(film) });
  }

  @ResolveField(() => [Planet])
  async planets(@Root() film: Film): Promise<Planet[]> {
    return this.swapiService.getPlanets(undefined, { filterType: 'films', filterValue: this.getId(film) });
  }

  @ResolveField(() => [Species])
  async species(@Root() film: Film): Promise<Species[]> {
    return this.swapiService.getSpecies(undefined, { filterType: 'films', filterValue: this.getId(film) });
  }

  @ResolveField(() => [Starship])
  async starships(@Root() film: Film): Promise<Starship[]> {
    return this.swapiService.getStarships(undefined, { filterType: 'films', filterValue: this.getId(film) });
  }

  @ResolveField(() => [Vehicle])
  async vehicles(@Root() film: Film): Promise<Vehicle[]> {
    return this.swapiService.getVehicles(undefined, { filterType: 'films', filterValue: this.getId(film) });
  }

  // todo: refactor repetitions
  private getId(film: Film) {
    return film.url.split('/').splice(-2, 1)[0];
  }
}
