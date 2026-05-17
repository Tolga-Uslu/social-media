import { Type } from "@sinclair/typebox";

export const createUserSchema = Type.Object({
  username: Type.String({ minLength: 1 }),
  name: Type.String({ minLength: 1 }),
  lastName: Type.String({ minLength: 1 }),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 1, maxLength: 16 }),
});

export const updateUserSchema = Type.Object({
  username: Type.Optional(Type.String({ minLength: 1 })),
  name: Type.Optional(Type.String({ minLength: 1 })),
  lastName: Type.Optional(Type.String({ minLength: 1 })),
  email: Type.Optional(Type.String({ format: "email" })),
});