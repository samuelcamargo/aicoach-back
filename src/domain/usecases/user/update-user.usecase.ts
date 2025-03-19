import { User, AccessLevel } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user-repository.interface';

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
  login?: string;
  password?: string;
  accessLevel?: AccessLevel;
}

export interface UpdateUserUseCase {
  execute(id: string, userData: UpdateUserDTO): Promise<Omit<User, 'password'> | null>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: (password: string) => Promise<string>
  ) {}

  async execute(id: string, userData: UpdateUserDTO): Promise<Omit<User, 'password'> | null> {
    // Verificar se o usuário existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return null;
    }

    // Verificar se o login já está em uso por outro usuário
    if (userData.login && userData.login !== existingUser.login) {
      const userWithSameLogin = await this.userRepository.findByLogin(userData.login);
      if (userWithSameLogin && userWithSameLogin.id !== id) {
        throw new Error('Login already in use');
      }
    }

    // Verificar se o email já está em uso por outro usuário
    if (userData.email && userData.email !== existingUser.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(userData.email);
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new Error('Email already in use');
      }
    }

    // Criar objeto de atualização
    const updateData: Partial<User> = { ...userData };

    // Se houver uma nova senha, criptografá-la
    if (userData.password) {
      updateData.password = await this.hashPassword(userData.password);
    }

    // Atualizar o usuário
    const updatedUser = await this.userRepository.update(id, updateData);
    
    if (!updatedUser) {
      return null;
    }

    // Remover a senha do objeto de retorno
    const { password: _pass, ...userWithoutPassword } = updatedUser;
    
    return userWithoutPassword;
  }
} 