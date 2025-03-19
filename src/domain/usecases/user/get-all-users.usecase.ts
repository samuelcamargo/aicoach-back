import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user-repository.interface';

export interface GetAllUsersUseCase {
  execute(): Promise<Array<Omit<User, 'password'>>>;
}

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Array<Omit<User, 'password'>>> {
    const users = await this.userRepository.findAll();
    
    // Remover a senha de todos os usuários no array
    return users.map(user => {
      const { password: _pass, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
} 