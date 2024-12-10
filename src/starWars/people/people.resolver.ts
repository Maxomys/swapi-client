import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Person } from './person.model';
import { Planet } from 'src/starWars/planets/planet.model';
import { Film } from 'src/starWars/films/film.model';
import { SwapiService } from 'src/swapi/swapi.service';
import { Species } from 'src/starWars/species/species.model';
import { Starship } from 'src/starWars/starships/starship.model';
import { Vehicle } from 'src/starWars/vehicles/vehicle.model';

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Person, { description: 'Fetch a person by id.' })
  async person(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getPersonById(id.toString());
  }

  @Query(() => [Person], { description: 'Fetch all people.' })
  async people(): Promise<Person[]> {
    return this.swapiService.getPeople();
  }

  @ResolveField(() => Planet)
  async homeworld(@Root() person: Person): Promise<Planet> {
    return (
      await this.swapiService.getPlanets(undefined, { filterType: 'people', filterValue: person.getId() })
    )[0];
  }

  @ResolveField(() => [Film])
  async films(@Root() person: Person): Promise<Film[]> {
    return this.swapiService.getFilms(undefined, { filterType: 'people', filterValue: person.getId() });
  }

  @ResolveField(() => [Species])
  async species(@Root() person: Person): Promise<Species[]> {
    return this.swapiService.getSpecies(undefined, { filterType: 'people', filterValue: person.getId() });
  }

  @ResolveField(() => [Starship])
  async starships(@Root() person: Person): Promise<Starship[]> {
    return this.swapiService.getStarships(undefined, { filterType: 'people', filterValue: person.getId() });
  }

  @ResolveField(() => [Vehicle])
  async vehicles(@Root() person: Person): Promise<Vehicle[]> {
    return this.swapiService.getVehicles(undefined, { filterType: 'people', filterValue: person.getId() });
  }
}
