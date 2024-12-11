import { Field, ObjectType } from '@nestjs/graphql';
import { UniqueWord } from './unique-word.model';

@ObjectType({ description: 'Analysis of the opening_crawl.' })
export class Analysis {
  @Field(() => [UniqueWord], { description: 'An array of unique words that are in all opening crawls' })
  unique_words: UniqueWord[];

  @Field(() => [String], {
    description:
      'A name of a character from the API that appears the most often across all of the openings of the films.',
  })
  most_mentioned_character: string[];
}
