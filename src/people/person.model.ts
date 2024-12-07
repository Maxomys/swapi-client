import { ObjectType, Field } from "@nestjs/graphql";

/**
 * Represents a Person in the Star Wars universe.
 */
@ObjectType({ description: "A Person resource in the Star Wars universe." })
export class Person {
  @Field(() => String, { description: "The name of this person." })
  name: string;

  @Field(() => String, { description: "The birth year of the person, using the in-universe standard of BBY or ABY." })
  birth_year: string;

  @Field(() => String, { description: "The eye color of this person. 'Unknown' if not known." })
  eye_color: string;

  @Field(() => String, { description: "The gender of this person. 'Unknown' or 'n/a' if not applicable." })
  gender: string;

  @Field(() => String, { description: "The hair color of this person. 'Unknown' if not known." })
  hair_color: string;

  @Field(() => String, { description: "The height of the person in centimeters." })
  height: string;

  @Field(() => String, { description: "The mass of the person in kilograms." })
  mass: string;

  @Field(() => String, { description: "The skin color of this person." })
  skin_color: string;

  @Field(() => String, { description: "The URL of a planet resource, a planet this person was born on or inhabits." })
  homeworld: string;

  @Field(() => [String], { description: "An array of film resource URLs that this person has been in." })
  films: string[];

  @Field(() => [String], { description: "An array of species resource URLs this person belongs to." })
  species: string[];

  @Field(() => [String], { description: "An array of starship resource URLs this person has piloted." })
  starships: string[];

  @Field(() => [String], { description: "An array of vehicle resource URLs this person has piloted." })
  vehicles: string[];

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was created." })
  created: string;

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was edited." })
  edited: string;
}
