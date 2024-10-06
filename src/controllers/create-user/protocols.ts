import { User } from "../../models/user";
import { ErrorBody, HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | ErrorBody>>;
}

export interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
