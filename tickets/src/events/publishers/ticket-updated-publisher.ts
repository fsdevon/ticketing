import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@crudfanboy/ticketing-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
