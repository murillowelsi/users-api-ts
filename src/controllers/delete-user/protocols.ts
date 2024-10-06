import { User } from "../../models/user";
import { ErrorBody, HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserControler {
  handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorBody>>;
}

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
