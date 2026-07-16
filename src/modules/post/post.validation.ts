import {Type} from "@sinclair/typebox"

export const createPostSchema=Type.Object({
    userId:Type.String({format:"uuid"}),
    content:Type.String({maxLength:280}),
});



export const updatePostSchema =Type.Object({
    content:Type.String({maxLength:280}),
});