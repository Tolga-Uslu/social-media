import { Hono } from "hono";
import { AppEnviornment } from "./types";
import { contextMiddleWare } from "./middleware/context.middleware";

const app = new Hono<AppEnviornment>();

app.use("*",contextMiddleWare);


app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
