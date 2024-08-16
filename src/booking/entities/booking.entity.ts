import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Event } from '../../event/entities/event.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Event)
  event: Event;
}
