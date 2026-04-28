import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";



const sql =postgres(process.env.DATABASE_URL="postgresql://admin:secret@localhost:5432/social_media?max=20&idle_timeout=30&max_lifetime=3600&connect_timeout=10");
 

export const db  = drizzle(sql);

export async function CloseDataBase(): Promise<void>{
    await sql.end();
    
}
