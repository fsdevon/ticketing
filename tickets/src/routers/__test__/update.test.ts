import request from "supertest";
import { app } from "../../app";
import mongoose, { mongo } from "mongoose";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "amwkfmkw",
      price: 20
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "amwkfmkwmksdmf",
      price: 20
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets/")
    .set("Cookie", global.signin())
    .send({
      title: "amwkfmkw",
      price: 20
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "makwmk",
      price: 1000
    })
    .expect(401);
});

it("returns a 404 if the provided an invalid title or price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets/")
    .set("Cookie", cookie)
    .send({
      title: "amwkfmkw",
      price: 20
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "msmk",
      price: -10
    })
    .expect(400);
});

it("updates the ticket provided valid input", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets/")
    .set("Cookie", cookie)
    .send({
      title: "amwkfmkw",
      price: 20
    })
    .expect(201);
  const title = "mkamfkw";
  const price = 10;
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send();

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

it("publishes an event", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets/")
    .set("Cookie", cookie)
    .send({
      title: "amwkfmkw",
      price: 20
    })
    .expect(201);
  const title = "mkamfkw";
  const price = 10;
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title,
      price
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects ", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets/")
    .set("Cookie", cookie)
    .send({
      title: "amwkfmkw",
      price: 20
    })
    .expect(201);
  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "mkasmc",
      price: 22
    })
    .expect(400);
});
