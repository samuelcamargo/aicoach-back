import { UserRepository } from '../../repositories/user-repository.interface';

export interface DeleteUserUseCase {
  execute(id: string): Promise<boolean>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<boolean> {
    // Verificar se o usuário existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return false;
    }

    // Deletar o usuário
    return this.userRepository.delete(id);
  }
} 