import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";



const sql =postgres(process.env.DATABASE_URL!,{

    max:20,//Havuzda aynı anda en fazla 20 bağlantı açık olabilir demek 
    idle_timeout:30,//Bir bağlantı 30 saniye boyunca hiç kullanılmassa otomatik kapanır
    max_lifetime:60*60,//Bir bağlantı ne kadar açık olursa olsun 1 saat sonra kapanıp yenisi açılır
    connect_timeout:10,// Veritabanına bağlanmaya çalışırken 10 saniyede bağlanamazsa hata verir.

});
 

export const db  = drizzle(sql);

export async function CloseDataBase(): Promise<void>{
    await sql.end();
    
}
