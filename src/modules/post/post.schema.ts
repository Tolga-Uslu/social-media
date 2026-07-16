import { uuid, boolean, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { users } from "../user/user.schema";
import { time } from "drizzle-orm/mysql-core";


export const posts =pgTable("posts",{
    id:uuid("id").primaryKey().defaultRandom(),
    userId:uuid("user_id").notNull().references(()=>users.id),
    content: text("content").notNull(),
    isDeleted:boolean("is_deleted").notNull().default(false),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updateAt:timestamp("update_at").notNull().defaultNow(),
});