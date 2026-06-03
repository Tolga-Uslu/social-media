import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "../modules/user/user.schema";

export interface IContextCore {
  db: PostgresJsDatabase<typeof schema>;
  nowDatetime: Date;
}

export type AppEnvironment = {
  Variables: IContextCore;
};

