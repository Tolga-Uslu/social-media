import { Hono } from "hono";
import { AppEnvironment } from "./types/app";
import { contextMiddleware } from "./middleware/context.middleware";
import { userRoute } from "./modules/user/user.route";

const app = new Hono<AppEnvironment>();

app.use("*", contextMiddleware);
app.route("/users", userRoute);

export default {
  port: Number(process.env.PORT) || 3000,
  fetch: app.fetch,
};