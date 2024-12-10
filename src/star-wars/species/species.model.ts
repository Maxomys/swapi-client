import { ObjectType, Field } from '@nestjs/graphql';
import { BaseStarWarsModel } from 'src/star-wars/baseStarWars.model';
import { Film } from 'src/star-wars/films/film.model';
import { Person } from 'src/star-wars/people/person.model';
import { Planet } from 'src/star-wars/planets/planet.model';

/**
 * Represents a Species in the Star Wars universe.
 */
@ObjectType({ description: 'A Species resource in the Star Wars universe.' })
export class Species extends BaseStarWarsModel {
  @Field(() => String, { description: 'The name of this species.' })
  name: string;

  @Field(() => String, { description: "The classification of this species, such as 'mammal' or 'reptile'." })
  classification: string;

  @Field(() => String, { description: "The designation of this species, such as 'sentient'." })
  designation: string;

  @Field(() => String, { description: 'The average height of this species in centimeters.' })
  average_height: string;

  @Field(() => String, { description: 'The average lifespan of this species in years.' })
  average_lifespan: string;

  @Field(() => String, { description: 'A comma-separated string of common eye colors for this species.' })
  eye_colors: string;

  @Field(() => String, { description: 'A comma-separated string of common hair colors for this species.' })
  hair_colors: string;

  @Field(() => String, { description: 'A comma-separated string of common skin colors for this species.' })
  skin_colors: string;

  @Field(() => String, { description: 'The language commonly spoken by this species.' })
  language: string;

  @Field(() => Planet, { description: 'The Planet Resource that this species originates from.' })
  homeworld: Planet | string;

  @Field(() => [Person], { description: 'An array of People Resources that are of this species.' })
  people: Person[] | string[];

  @Field(() => [Film], { description: 'An array of Film Resources that this species has appeared in.' })
  films: Film[] | string[];
}
