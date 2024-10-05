import { User } from "../../models/user";

export interface CreateUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
