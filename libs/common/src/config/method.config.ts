import { applyDecorators, Post } from "@nestjs/common"

export const DefaultPost = (name: string, response?: any) => {
    return applyDecorators(
        Post(name),
    )
}