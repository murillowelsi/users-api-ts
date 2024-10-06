export interface ErrorBody {
  error: string;
  message: string;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T | ErrorBody;
}

export interface HttpRequest<B> {
  body?: B;
  params?: unknown;
  headers?: unknown;
}
