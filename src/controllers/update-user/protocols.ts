import { User } from "../../models/user";
import { ErrorBody, HttpRequest, HttpResponse } from "../protocols";

export interface UpdateUserParams {
  firstname?: string;
  lastname?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}

export interface IUpdateUserController {
  handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorBody>>;
}
