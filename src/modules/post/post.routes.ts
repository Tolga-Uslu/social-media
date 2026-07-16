import { Hono } from "hono";
import {tbValidator} from "@hono/typebox-validator"
import { AppEnvironment } from "../../types/app";
import { createPostSchema,updatePostSchema } from "./post.validation";   
import * as postService from "./post.service" 
import { get } from "../user/user.service";

const postRoute =new Hono<AppEnvironment>();


postRoute.get("/",async(c)=>{
    return c.json(await postService.getAll(c.var));
})
postRoute.get("/:id",async(c)=>{
    return c.json(await postService.getById(c.var,c.req.param("id")));
})


postRoute.get("/:userId",async (c)=>{
    return c.json(await postService.getByUserId(c.var,c.req.param("userId")));
});

postRoute.post("/",tbValidator("json",createPostSchema),async (c)=>{
    return c.json(await postService.create(c.var,c.req.valid("json")),201);

});


postRoute.put("/:id",tbValidator("json",updatePostSchema),async (c)=>{
    return c.json(await postService.update(c.var,c.req.param("id"),c.req.valid("json")),201);
});


postRoute.delete("/:id",async (c)=>{
    return c.json(await postService.remove(c.var,c.req.param("id")));

});

export{postRoute};
