import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user-repository.interface';

export interface AuthenticateUserDTO {
  login: string;
  password: string;
}

export interface AuthenticateUserResponse {
  user: Omit<User, 'password'>;
  token: string;
  expiresIn: number;
}

export interface AuthenticateUserUseCase {
  execute(credentials: AuthenticateUserDTO): Promise<AuthenticateUserResponse>;
}

export class AuthenticateUser implements AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: (password: string, hashedPassword: string) => Promise<boolean>,
    private readonly tokenGenerator: (userId: string) => Promise<{ token: string; expiresIn: number }>
  ) {}

  async execute(credentials: AuthenticateUserDTO): Promise<AuthenticateUserResponse> {
    const { login, password } = credentials;
    
    // Buscar usuário pelo login
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      throw new Error('Invalid login or password');
    }

    // Verificar se a senha está correta
    const isPasswordValid = await this.hashComparer(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid login or password');
    }

    // Gerar token JWT
    const { token, expiresIn } = await this.tokenGenerator(user.id as string);

    // Remover senha do objeto de usuário para retorno
    const { password: _pass, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      expiresIn
    };
  }
} 