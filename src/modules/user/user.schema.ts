import { uuid, boolean, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  name: text("name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});