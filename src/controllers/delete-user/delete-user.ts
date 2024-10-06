import { User } from "../../models/user";
import { ErrorBody, HttpRequest, HttpResponse } from "../protocols";
import { IDeleteUserControler, IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IDeleteUserControler {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<User | ErrorBody>> {
    try {
      const id = httpRequest.params?.id;
      if (!id) {
        return {
          statusCode: 400,
          body: {
            error: "Bad Request",
            message: "UserId is missing.",
          },
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);

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
