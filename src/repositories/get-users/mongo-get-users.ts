import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@gmail.com",
        password: "123456",
      },
      {
        firstname: "John2",
        lastname: "Doe2",
        email: "john.doe2@gmail.com",
        password: "123456",
      },
    ];
  }
}
