import { AppEnviornment } from "../types";
import { createMiddleware } from "hono/factory";
import { db } from "../db";




export const contextMiddleWare = createMiddleware<AppEnviornment>(
    async(c,next)=>{
        // Drizzle ORM veritabanı instance'ını context'e ekle
        c.set("db",db);
        // Şu anki zamanı ISO 8601 formatında context'e ekle
        c.set("dateTime",()=> new Date().toISOString());
        await next();
    }
)