import { ObjectType, Field, Int } from "@nestjs/graphql";

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

  @Field(() => [String], { description: "An array of species resource URLs that are in this film." })
  species: string[];

  @Field(() => [String], { description: "An array of starship resource URLs that are in this film." })
  starships: string[];

  @Field(() => [String], { description: "An array of vehicle resource URLs that are in this film." })
  vehicles: string[];

  @Field(() => [String], { description: "An array of people resource URLs that are in this film." })
  characters: string[];

  @Field(() => [String], { description: "An array of planet resource URLs that are in this film." })
  planets: string[];

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was created." })
  created: string;

  @Field(() => String, { description: "The ISO 8601 date format of the time that this resource was edited." })
  edited: string;
}
