import { ObjectType, Field } from '@nestjs/graphql';
import { BaseStarWarsModel } from 'src/star-wars/baseStarWars.model';
import { Film } from 'src/star-wars/films/film.model';
import { Planet } from 'src/star-wars/planets/planet.model';
import { Species } from 'src/star-wars/species/species.model';
import { Starship } from 'src/star-wars/starships/starship.model';
import { Vehicle } from 'src/star-wars/vehicles/vehicle.model';

/**
 * Represents a Person in the Star Wars universe.
 */
@ObjectType({ description: 'A Person resource in the Star Wars universe.' })
export class Person extends BaseStarWarsModel {
  @Field(() => String, { description: 'The name of this person.' })
  name: string;

  @Field(() => String, { description: 'The birth year of the person, using the in-universe standard of BBY or ABY.' })
  birth_year: string;

  @Field(() => String, { description: "The eye color of this person. 'Unknown' if not known." })
  eye_color: string;

  @Field(() => String, { description: "The gender of this person. 'Unknown' or 'n/a' if not applicable." })
  gender: string;

  @Field(() => String, { description: "The hair color of this person. 'Unknown' if not known." })
  hair_color: string;

  @Field(() => String, { description: 'The height of the person in centimeters.' })
  height: string;

  @Field(() => String, { description: 'The mass of the person in kilograms.' })
  mass: string;

  @Field(() => String, { description: 'The skin color of this person.' })
  skin_color: string;

  @Field(() => Planet, { description: 'A planet this person was born on or inhabits.' })
  homeworld: Planet | string;

  @Field(() => [Film], { description: 'An array of films that this person has been in.' })
  films: Film[] | string[];

  @Field(() => [Species], { description: 'An array of species this person belongs to.' })
  species: Species[] | string[];

  @Field(() => [Starship], { description: 'An array of starships this person has piloted.' })
  starships: Starship[] | string[];

  @Field(() => [Vehicle], { description: 'An array of vehicles this person has piloted.' })
  vehicles: Vehicle[] | string[];
}
