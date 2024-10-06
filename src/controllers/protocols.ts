export interface ErrorBody {
  error: string;
  message: string;
}

export interface HttpResponse<T> {
  statusCode: number;
  body?: T | ErrorBody;
}

export interface HttpRequest<B> {
  body?: B;
  params?: {
    id?: string;
  };
  headers?: unknown;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export interface IController {
  handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown | ErrorBody>>;
}
