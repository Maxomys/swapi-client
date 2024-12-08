import { ObjectType, Field } from "@nestjs/graphql";
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';

/**
 * Represents a Starship in the Star Wars universe.
 */
@ObjectType({ description: "A Starship resource in the Star Wars universe." })
export class Starship {
  @Field(() => String, { description: "The name of this starship. The common name, such as 'Death Star'." })
  name: string;

  @Field(() => String, { description: "The model or official name of this starship, such as 'DS-1 Orbital Battle Station'." })
  model: string;

  @Field(() => String, { description: "The class of this starship, such as 'Starfighter' or 'Deep Space Mobile Battlestation'." })
  starship_class: string;

  @Field(() => String, { description: "The manufacturer of this starship. Comma separated if more than one." })
  manufacturer: string;

  @Field(() => String, { description: "The cost of this starship new, in Galactic Credits." })
  cost_in_credits: string;

  @Field(() => String, { description: "The length of this starship in meters." })
  length: string;

  @Field(() => String, { description: "The number of personnel needed to run or pilot this starship." })
  crew: string;

  @Field(() => String, { description: "The number of non-essential people this starship can transport." })
  passengers: string;

  @Field(() => String, { description: "The maximum speed of this starship in the atmosphere. 'N/A' if incapable of atmospheric flight." })
  max_atmosphering_speed: string;

  @Field(() => String, { description: "The class of this starship's hyperdrive." })
  hyperdrive_rating: string;

  @Field(() => String, { description: "The Maximum number of Megalights this starship can travel in a standard hour." })
  MGLT: string;

  @Field(() => String, { description: "The maximum number of kilograms that this starship can transport." })
  cargo_capacity: string;

  @Field(() => String, { description: "The maximum length of time that this starship can provide consumables for its entire crew without resupply." })
  consumables: string;

  @Field(() => [Film], { description: "An array of Film Resources that this starship has appeared in." })
  films: Film[];

  @Field(() => [Person], { description: "An array of People Resources that this starship has been piloted by." })
  pilots: Person[];

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was created." })
  created: string;

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was edited." })
  edited: string;
}
