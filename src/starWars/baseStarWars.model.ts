import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseStarWarsModel {
  @Field(() => String, { description: 'The ISO 8601 date format of the time that this resource was created.' })
  created: string;

  @Field(() => String, { description: 'The ISO 8601 date format of the time that this resource was edited.' })
  edited: string;

  @Field(() => String)
  url: string;

  getId() {
    return this.url.split('/').splice(-2, 1)[0];
  }
}
