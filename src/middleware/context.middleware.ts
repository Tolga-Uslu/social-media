import { AppEnvironment } from "../types/app";
import { createMiddleware } from "hono/factory";
import { db } from "../db";




export const contextMiddleWare = createMiddleware<AppEnvironment>(
    async(c,next)=>{     
        c.set("db",db);
        c.set("dateTime",()=> new Date().toISOString());
        await next();
    }
)