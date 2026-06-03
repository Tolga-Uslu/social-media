import { createMiddleware } from "hono/factory";
import { db } from "../db";
import { AppEnvironment } from "../types/app";

export const contextMiddleware = createMiddleware<AppEnvironment>(
  async (c, next) => {
    c.set("db", db);
    c.set("nowDatetime", new Date());
    await next();
  },
);
