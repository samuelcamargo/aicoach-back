import { AuthController } from '../../presentation/controllers/auth.controller';
import { AuthenticateUser } from '../../domain/usecases/auth/authenticate-user.usecase';
import { MongoUserRepository } from '../../infra/database/mongodb/repositories/user.repository';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter';

export const makeAuthController = (): AuthController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtSecret = process.env.JWT_SECRET || 'default_secret';
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
  const jwtAdapter = new JwtAdapter(jwtSecret, jwtExpiresIn);
  const userRepository = new MongoUserRepository();
  const authenticateUseCase = new AuthenticateUser(
    userRepository,
    bcryptAdapter.compare.bind(bcryptAdapter),
    jwtAdapter.generate.bind(jwtAdapter)
  );

  return new AuthController(authenticateUseCase);
}; 