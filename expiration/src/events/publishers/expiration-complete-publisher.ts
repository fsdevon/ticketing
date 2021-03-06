import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects
} from "@crudfanboy/ticketing-common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
