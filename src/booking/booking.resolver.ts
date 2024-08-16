import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { Booking } from './entities/booking.entity';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  async createBooking(
    @Args('input') createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    return this.bookingService.create(createBookingInput);
  }

  @Query(() => [Booking])
  async bookings(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Query(() => Booking)
  async booking(@Args('id', { type: () => Int }) id: number): Promise<Booking> {
    return this.bookingService.findOne(id);
  }
}
