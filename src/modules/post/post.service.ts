import { posts } from "./post.schema"
import { IContextCore } from "../../types/app"
import{eq ,and ,desc} from "drizzle-orm"

const postColumns={
id:posts.id,
userId:posts.userId,
content:posts.content,
createdAt:posts.createdAt,
updateAt:posts.updateAt,
};


export async function getAll({db}:IContextCore){
   return db
   .select(postColumns)
   .from(posts)
   .where (eq(posts.isDeleted,false))
    .orderBy(desc(posts.createdAt))
}
export async function getById({db}:IContextCore,id:string){
    const [post] =await db
    .select(postColumns)
    .from(posts)
    .where(and(eq(posts.id,id), eq(posts.isDeleted,false)));
    return post;
   
}

export async function getByUserId({db}:IContextCore,userId:string) {
    return db
    .select(postColumns)
    .from(posts)
    .where(and(eq(posts.userId,userId),eq(posts.isDeleted,false)))
    .orderBy(desc(posts.createdAt));

}
export async function create (
    {db}:IContextCore,
    data:{userId:string , content:string}
){
    const [post]=await db
    .insert(posts)
    .values(data)
    .returning(postColumns);
    return post;
}
export async function update({db}:IContextCore,
    id:string,
    data:{content?:string}
){
const [post] =await db
.update(posts)
.set(data)
.where(and(eq(posts.id,id),eq(posts.isDeleted,false)))
.returning(postColumns)
return post;
}


export async function remove({db}:IContextCore,id:string){
const [post]=await db
.update(posts)
.set ({isDeleted:true})
.where(and(eq(posts.id,id),eq(posts.isDeleted,false)))
return post;
}


