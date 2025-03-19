import { AuthMiddleware } from '../../presentation/middlewares/auth.middleware';
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter';

export const makeAuthMiddleware = (): AuthMiddleware => {
  const jwtSecret = process.env.JWT_SECRET || 'default_secret';
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
  const jwtAdapter = new JwtAdapter(jwtSecret, jwtExpiresIn);
  
  return new AuthMiddleware(jwtAdapter);
}; 