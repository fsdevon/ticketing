import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
  OrderCancelledEvent
} from "@crudfanboy/ticketing-common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
