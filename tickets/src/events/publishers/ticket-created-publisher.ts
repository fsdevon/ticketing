import {
  Publisher,
  TicketCreatedEvent,
  Subjects,
} from "@crudfanboy/ticketing-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
