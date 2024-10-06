import { User } from "../../models/user";
import { badRequest, internalServerError, ok } from "../helpers";
import {
  ErrorBody,
  HttpRequest,
  HttpResponse,
  IController,
} from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorBody | string>> {
    try {
      const id = httpRequest.params?.id;
      if (!id) {
        return badRequest("User id is missing.");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return ok(user);
    } catch (error) {
      return internalServerError(
        error instanceof Error ? error.message : String(error)
      );
    }
  }
}
