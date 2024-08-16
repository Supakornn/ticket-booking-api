import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Booking } from '../../booking/entities/booking.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => [Booking], { nullable: true })
  bookings?: Booking[];
}
