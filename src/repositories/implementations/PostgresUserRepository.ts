import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class PostgresUserRepository implements IUserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((userItem) => userItem.email === email);
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
