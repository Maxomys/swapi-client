import { Field, ObjectType } from '@nestjs/graphql';
import { UniqueWord } from './unique-word.model';

@ObjectType({ description: 'Analysis of the opening_crawl.' })
export class Analysis {
  @Field(() => [UniqueWord])
  unique_words: UniqueWord[];

  @Field(() => [String])
  most_mentioned_character: string[];
}
