import { Hono } from "hono";
import { tbValidator } from "@hono/typebox-validator";
import { AppEnvironment } from "../../types/app";
import { createUserSchema, updateUserSchema } from "./user.validation";
import * as userService from "./user.service";

const userRoute = new Hono<AppEnvironment>();

userRoute.get("/", async (c) => {
  return c.json(await userService.get(c.var));
});

userRoute.get("/:id", async (c) => {
  return c.json(await userService.getById(c.var, c.req.param("id")));
});

userRoute.post("/", tbValidator("json", createUserSchema), async (c) => {
  return c.json(await userService.create(c.var, c.req.valid("json")), 201);
});

userRoute.put("/:id", tbValidator("json", updateUserSchema), async (c) => {
  return c.json(await userService.update(c.var, c.req.param("id"), c.req.valid("json")));
});

userRoute.delete("/:id", async (c) => {
  return c.json(await userService.remove(c.var, c.req.param("id")));
});

export { userRoute };