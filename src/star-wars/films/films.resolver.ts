import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Film } from './film.model';
import { Person } from 'src/star-wars/people/person.model';
import { Planet } from 'src/star-wars/planets/planet.model';
import { Species } from 'src/star-wars/species/species.model';
import { Starship } from 'src/star-wars/starships/starship.model';
import { Vehicle } from 'src/star-wars/vehicles/vehicle.model';
import { SwapiService } from 'src/swapi/swapi.service';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Film, { description: 'Fetch a film by id.' })
  async film(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getFilmById(id.toString());
  }

  @Query(() => [Film], { description: 'Fetch all films.' })
  async films(@Args('search') search?: string) {
    return this.swapiService.getFilms(search);
  }

  @ResolveField(() => [Person])
  async characters(@Root() film: Film): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'films', filterValue: film.getId() });
  }

  @ResolveField(() => [Planet])
  async planets(@Root() film: Film): Promise<Planet[]> {
    return this.swapiService.getPlanets(undefined, { filterType: 'films', filterValue: film.getId() });
  }

  @ResolveField(() => [Species])
  async species(@Root() film: Film): Promise<Species[]> {
    return this.swapiService.getSpecies(undefined, { filterType: 'films', filterValue: film.getId() });
  }

  @ResolveField(() => [Starship])
  async starships(@Root() film: Film): Promise<Starship[]> {
    return this.swapiService.getStarships(undefined, { filterType: 'films', filterValue: film.getId() });
  }

  @ResolveField(() => [Vehicle])
  async vehicles(@Root() film: Film): Promise<Vehicle[]> {
    return this.swapiService.getVehicles(undefined, { filterType: 'films', filterValue: film.getId() });
  }
}
