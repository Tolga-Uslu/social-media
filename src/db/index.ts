import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../modules/user/user.schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}

const sql = postgres(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });
