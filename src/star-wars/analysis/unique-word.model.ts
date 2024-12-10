import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UniqueWord {
  @Field(() => String)
  word: string;

  @Field(() => Int)
  count: number;
}
