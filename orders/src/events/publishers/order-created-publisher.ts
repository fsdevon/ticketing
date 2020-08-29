import {
  Publisher,
  OrderCreatedEvent,
  Subjects
} from "@crudfanboy/ticketing-common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
