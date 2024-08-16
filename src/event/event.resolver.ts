import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  async createEvent(
    @Args('input') createEventInput: CreateEventInput,
  ): Promise<Event> {
    return this.eventService.createEvent(createEventInput);
  }

  @Query(() => [Event])
  async events() {
    return this.eventService.findAll();
  }

  @Query(() => Event, { nullable: true })
  async event(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }
}
