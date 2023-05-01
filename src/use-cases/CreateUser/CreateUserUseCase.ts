import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDto";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private emailProvider: IMailProvider,
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAreadyExists) {
      throw new Error("User aready exists");
    }

    const user = new User(data);

    await this.userRepository.save(user);
    await this.emailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe de suporte",
        email: "suport@suporte.com",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<p>Você já pode fazer login em nossa plataforma</p>",
    });
  }
}
