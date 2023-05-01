import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserRequestDTO } from "./CreateUserDto";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body as ICreateUserRequestDTO;

    try {
      await this.createUserUseCase.execute({ email, name, password });

      return response.status(200).json({
        type: "sucess",
        message: "Usuário criado com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({
          type: "error",
          message: error.message ?? "Usuário criado com sucesso",
        });
      } else {
        return response.status(500).json({
          type: "error",
          message: "Error interno no servidor",
        });
      }
    }
  }
}
