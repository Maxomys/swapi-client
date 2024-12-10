import { Args, Int, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Starship } from './starship.model';
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';
import { SwapiService } from 'src/swapi/swapi.service';

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(private swapiService: SwapiService) {}

  @Query(() => Starship, { description: 'Fetch a starship by id.' })
  async starship(@Args('id', { type: () => Int }) id: number) {
    return this.swapiService.getStarshipById(id.toString());
  }

  @Query(() => [Starship], { description: 'Fetch all starships.' })
  async starships(): Promise<Starship[]> {
    return this.swapiService.getStarships();
  }

  @ResolveField(() => [Film])
  async films(@Root() starship: Starship): Promise<Film[]> {
    return this.swapiService.getFilms(undefined, { filterType: 'starships', filterValue: this.getId(starship) });
  }

  @ResolveField(() => [Person])
  async pilots(@Root() starship: Starship): Promise<Person[]> {
    return this.swapiService.getPeople(undefined, { filterType: 'starships', filterValue: this.getId(starship) });
  }

  private getId(starship: Starship) {
    return starship.url.split('/').splice(-2, 1)[0];
  }
}
