import { PostgresJsDatabase } from "drizzle-orm/postgres-js";


type AppVariables ={
    db:PostgresJsDatabase;
    dateTime:()=> string;
};


export type AppEnviornment ={
    Variables:AppVariables;
};