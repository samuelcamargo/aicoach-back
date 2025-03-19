import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user-repository.interface';

export interface GetUserUseCase {
  execute(id: string): Promise<Omit<User, 'password'> | null>;
}

export class GetUser implements GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      return null;
    }

    // Remover a senha do objeto de retorno
    const { password: _pass, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  }
} 