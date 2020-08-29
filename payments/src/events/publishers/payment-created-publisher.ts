import {
  Publisher,
  PaymentCreatedEvent,
  Subjects
} from "@crudfanboy/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
