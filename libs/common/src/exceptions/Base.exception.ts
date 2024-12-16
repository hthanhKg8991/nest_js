import { HttpException, HttpExceptionOptions, HttpStatus, NestInterceptor } from "@nestjs/common";

export const BaseResponseError = (message: string | Record<string, any>, code?: number, options?: HttpExceptionOptions) => {
    throw new HttpException(
        message,
        code || HttpStatus.BAD_REQUEST,
        options
    )
}

export const BaseResponseSuccess = (data: any | unknown, message?: string | Record<string, any>, code?: number, options?: HttpExceptionOptions) => {
    return {
        data: data,
        message: message,
        code: code || HttpStatus.OK,
        options: options,
    }
}