import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";



const sql =postgres(process.env.DATABASE_URL);
 

export const db  = drizzle(sql);

export async function CloseDataBase(): Promise<void>{
    await sql.end();
    
}
