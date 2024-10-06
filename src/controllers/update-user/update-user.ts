import { User } from "../../models/user";
import { ErrorBody, HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorBody>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body as UpdateUserParams;

      if (!id) {
        return {
          statusCode: 400,
          body: {
            error: "Bad Request",
            message: "UserId is missing.",
          },
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstname",
        "lastname",
        "password",
      ];
      const someFieldIsNotAllowedToBeUpdated = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToBeUpdated) {
        return {
          statusCode: 400,
          body: {
            error: "Bad Request",
            message: "Some received field is not allowed to be updated.",
          },
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
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
