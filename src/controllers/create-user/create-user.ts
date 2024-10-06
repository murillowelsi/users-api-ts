import validator from "validator";
import { User } from "../../models/user";
import { badRequest, created, internalServerError } from "../helpers";
import {
  ErrorBody,
  HttpRequest,
  HttpResponse,
  IController,
} from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | ErrorBody | string>> {
    try {
      const requiredFields = ["firstname", "lastname", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`The ${field} is required.`);
        }
      }

      const email = httpRequest.body!.email;
      const emailIsValid = validator.isEmail(email);

      if (!emailIsValid) {
        return badRequest(`Email ${email} is not valid.`);
      }

      if (!httpRequest.body) {
        return badRequest("Request body is missing.");
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return created<User>(user);
    } catch (error) {
      return internalServerError(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}
