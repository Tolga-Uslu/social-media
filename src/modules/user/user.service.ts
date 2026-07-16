import { eq, and } from "drizzle-orm";
import { IContextCore } from "../../types/app";
import { users } from "./user.schema";

const userColumns = {
  id: users.id,
  username: users.username,
  name: users.name,
  lastName: users.lastName,
  email: users.email,
  isDeleted: users.isDeleted,
};

export async function get({ db }: IContextCore) {
  return db.select(userColumns).from(users).where(eq(users.isDeleted, false));
}

export async function getById({ db }: IContextCore, id: string) {
  const [user] = await db
    .select(userColumns)
    .from(users)
    .where(and(eq(users.id, id), eq(users.isDeleted, false)));
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
    .returning(userColumns);
  return user;
}

export async function update(
  { db }: IContextCore,
  id: string,
  data: { username?: string; name?: string; lastName?: string; email?: string }
) {
  const [user] = await db
    .update(users)
    .set(data)
    .where(and(eq(users.id, id),eq(users.isDeleted,false)))
    .returning(userColumns);
  return user;
}

export async function remove({ db }: IContextCore, id: string) {
  const [user] = await db
    .update(users)
    .set({ isDeleted: true })
    .where(and(eq(users.id, id),eq(users.isDeleted,false)))
    .returning(userColumns);
  return user;
}