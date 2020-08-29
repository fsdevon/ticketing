import express, { Request, Response } from "express";
import { requireAuth } from "@crudfanboy/ticketing-common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets", requireAuth, async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined
  });
  res.send(tickets);
});

export { router as indexTicketRouter };
