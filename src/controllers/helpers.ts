import { HttpResponse, HttpStatusCode } from "./protocols";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body: body,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body: body,
  };
};

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: {
      error: "Bad Request",
      message: message,
    },
  };
};

export const internalServerError = (message: string) => {
  return {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    body: {
      error: "Internal Server Error",
      message: message,
    },
  };
};
