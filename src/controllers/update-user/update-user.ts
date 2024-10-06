import { User } from "../../models/user";
import { badRequest, internalServerError, ok } from "../helpers";
import {
  ErrorBody,
  HttpRequest,
  HttpResponse,
  IController,
} from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | ErrorBody | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body as UpdateUserParams;

      if (!body) {
        return badRequest("Body missing required fields.");
      }

      if (!id) {
        return badRequest("User id is missing.");
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
        return badRequest("Some received field is not allowed to be updated.");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch (error) {
      return internalServerError(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}
