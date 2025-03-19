import { User, AccessLevel } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user-repository.interface';

export interface CreateUserDTO {
  name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
  accessLevel: AccessLevel;
}

export interface CreateUserUseCase {
  execute(userData: CreateUserDTO): Promise<Omit<User, 'password'>>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: (password: string) => Promise<string>
  ) {}

  async execute(userData: CreateUserDTO): Promise<Omit<User, 'password'>> {
    // Verificar se o login já existe
    const existingUserLogin = await this.userRepository.findByLogin(userData.login);
    if (existingUserLogin) {
      throw new Error('Login already in use');
    }

    // Verificar se o email já existe
    const existingUserEmail = await this.userRepository.findByEmail(userData.email);
    if (existingUserEmail) {
      throw new Error('Email already in use');
    }

    // Criptografar a senha
    const hashedPassword = await this.hashPassword(userData.password);

    // Criar o usuário
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    // Remover a senha do objeto de retorno
    const { password: _pass, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
} 