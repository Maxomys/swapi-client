import { ObjectType, Field } from "@nestjs/graphql";
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';

/**
 * Represents a Vehicle in the Star Wars universe.
 */
@ObjectType({ description: "A Vehicle resource in the Star Wars universe." })
export class Vehicle {
  @Field(() => String, { description: "The name of this vehicle. The common name, such as 'Sand Crawler'." })
  name: string;

  @Field(() => String, { description: "The model or official name of this vehicle." })
  model: string;

  @Field(() => String, { description: "The class of this vehicle, such as 'Wheeled' or 'Repulsorcraft'." })
  vehicle_class: string;

  @Field(() => String, { description: "The manufacturer of this vehicle. Comma separated if more than one." })
  manufacturer: string;

  @Field(() => String, { description: "The cost of this vehicle new, in Galactic Credits." })
  cost_in_credits: string;

  @Field(() => String, { description: "The length of this vehicle in meters." })
  length: string;

  @Field(() => String, { description: "The number of personnel needed to run or pilot this vehicle." })
  crew: string;

  @Field(() => String, { description: "The number of non-essential people this vehicle can transport." })
  passengers: string;

  @Field(() => String, { description: "The maximum speed of this vehicle in the atmosphere." })
  max_atmosphering_speed: string;

  @Field(() => String, { description: "The maximum number of kilograms that this vehicle can transport." })
  cargo_capacity: string;

  @Field(() => String, { description: "The maximum length of time this vehicle can provide consumables for its entire crew without resupply." })
  consumables: string;

  @Field(() => [Film], { description: "An array of Film Resources that this vehicle has appeared in." })
  films: Film[];

  @Field(() => [Person], { description: "An array of People Resources that this vehicle has been piloted by." })
  pilots: Person[];

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was created." })
  created: string;

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was edited." })
  edited: string;
}
