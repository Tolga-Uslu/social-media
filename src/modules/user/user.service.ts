import { eq } from "drizzle-orm";
import { IContextCore } from "../../types/app";
import { users } from "./user.schema";

export async function get({ db }: IContextCore) {
  return db.select().from(users).where(eq(users.isDeleted, false));
}

export async function getById({ db }: IContextCore, id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function create(
  { db }: IContextCore,
  data: { username: string; name: string; lastName: string; email: string; password: string }
) {
  const hashedPassword = await Bun.password.hash(data.password);
  const [user] = await db
    .insert(users)
    .values({ ...data, password: hashedPassword })
    .returning();
  return user;
}

export async function update(
  { db }: IContextCore,
  id: string,
  data: { username?: string; name?: string; lastName?: string; email?: string }
) {
  const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return user;
}

export async function remove({ db }: IContextCore, id: string) {
  const [user] = await db
    .update(users)
    .set({ isDeleted: true })
    .where(eq(users.id, id))
    .returning();
  return user;
}