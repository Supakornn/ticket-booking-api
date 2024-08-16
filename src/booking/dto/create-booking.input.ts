import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Event ID is required.' })
  eventId: number;
}
