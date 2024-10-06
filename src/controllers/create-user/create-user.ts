import validator from "validator";
import { User } from "../../models/user";
import { ErrorBody, HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | ErrorBody>> {
    try {
      const requiredFields = ["firstname", "lastname", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: {
              error: "Validation Error",
              message: `The ${field} is required.`,
            },
          };
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: {
            error: "Validation Error",
            message: `Email is not valid.`,
          },
        };
      }

      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: {
            error: "Bad Request",
            message: "Request body is missing.",
          },
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          error: "Internal Server Error",
          message: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }
}
