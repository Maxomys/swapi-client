import { ObjectType, Field } from "@nestjs/graphql";

/**
 * Represents a Planet in the Star Wars universe.
 */
@ObjectType({ description: "A Planet resource in the Star Wars universe." })
export class Planet {
  @Field(() => String, { description: "The name of this planet." })
  name: string;

  @Field(() => String, { description: "The diameter of this planet in kilometers." })
  diameter: string;

  @Field(() => String, { description: "The number of standard hours it takes for this planet to complete a single rotation on its axis." })
  rotation_period: string;

  @Field(() => String, { description: "The number of standard days it takes for this planet to complete a single orbit of its local star." })
  orbital_period: string;

  @Field(() => String, { description: "A number denoting the gravity of this planet, where '1' is normal or 1 standard G." })
  gravity: string;

  @Field(() => String, { description: "The average population of sentient beings inhabiting this planet." })
  population: string;

  @Field(() => String, { description: "The climate of this planet. Comma separated if diverse." })
  climate: string;

  @Field(() => String, { description: "The terrain of this planet. Comma separated if diverse." })
  terrain: string;

  @Field(() => String, { description: "The percentage of the planet surface that is naturally occurring water or bodies of water." })
  surface_water: string;

  @Field(() => [String], { description: "An array of People URL Resources that live on this planet." })
  residents: string[];

  @Field(() => [String], { description: "An array of Film URL Resources that this planet has appeared in." })
  films: string[];

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was created." })
  created: string;

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was edited." })
  edited: string;
}
