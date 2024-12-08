import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Person } from 'src/people/person.model';
import { Planet } from 'src/planets/planet.model';
import { Species } from 'src/species/species.model';
import { Starship } from 'src/starships/starship.model';
import { Vehicle } from 'src/vehicles/vehicle.model';

/**
 * Represents a Film in the Star Wars universe.
 */
@ObjectType({ description: "A Film resource in the Star Wars universe." })
export class Film {
  @Field(() => String, { description: "The title of this film." })
  title: string;

  @Field(() => Int, { description: "The episode number of this film." })
  episode_id: number;

  @Field(() => String, { description: "The opening paragraphs at the beginning of this film." })
  opening_crawl: string;

  @Field(() => String, { description: "The name of the director of this film." })
  director: string;

  @Field(() => String, { description: "The name(s) of the producer(s) of this film. Comma separated." })
  producer: string;

  @Field(() => String, { description: "The ISO 8601 date format of the film release." })
  release_date: string;

  @Field(() => [Species], { description: "An array of species that are in this film." })
  species: Species[];

  @Field(() => [Starship], { description: "An array of starship that are in this film." })
  starships: Starship[];

  @Field(() => [Vehicle], { description: "An array of vehicle that are in this film." })
  vehicles: Vehicle[];

  @Field(() => [Person], { description: "An array of people that are in this film." })
  characters: Person[];

  @Field(() => [Planet], { description: "An array of planet that are in this film." })
  planets: Planet[];

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was created." })
  created: string;

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was edited." })
  edited: string;
}
