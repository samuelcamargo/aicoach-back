import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../domain/usecases/auth/authenticate-user.usecase';

export class AuthController {
  constructor(private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(400).json({ error: 'Login and password are required' });
      }

      const authResult = await this.authenticateUserUseCase.execute({ login, password });

      return res.status(200).json(authResult);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Invalid login or password') {
          return res.status(401).json({ error: error.message });
        }
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
} 