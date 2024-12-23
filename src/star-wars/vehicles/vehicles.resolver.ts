import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Vehicle } from './vehicle.model';
import { Film } from 'src/star-wars/films/film.model';
import { Person } from 'src/star-wars/people/person.model';
import { SwapiService } from 'src/swapi/swapi.service';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Vehicle, { description: 'Fetch a vehicle by id.' })
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getVehicleById(id.toString());
  }

  @Query(() => [Vehicle], { description: 'Fetch all vehicles.' })
  async vehicles(@Args('search') search?: string): Promise<Vehicle[]> {
    return this.swapiService.getVehicles(search);
  }

  @ResolveField(() => [Film])
  async films(@Root() vehicle: Vehicle): Promise<Film[]> {
    return this.swapiService.getFilms(undefined, { filterType: 'vehicles', filterValue: vehicle.getId() });
  }

  @ResolveField(() => [Person])
  async pilots(@Root() vehicle: Vehicle): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'vehicles', filterValue: vehicle.getId() });
  }
}
