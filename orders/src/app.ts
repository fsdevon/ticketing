import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@crudfanboy/ticketing-common";
import cookieSession from "cookie-session";

import { createOrderRouter } from "./routers/new";
import { showOrderRouter } from "./routers/show";
import { indexOrderRouter } from "./routers/index";
import { deleteOrderRouter } from "./routers/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "dev",
  })
);

app.use(currentUser);

app.use(createOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
