import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  title: string;

  @Field({ nullable: true })
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @Field()
  @IsNotEmpty({ message: 'Date is required.' })
  @IsDateString({}, { message: 'Date must be a valid date string.' })
  date: string;
}
