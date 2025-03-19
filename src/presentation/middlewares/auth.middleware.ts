import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../infra/cryptography/jwt-adapter';

// Estendendo a interface Request do Express para incluir userId
// Ignorando a regra de namespace para manter a compatibilidade com a tipagem do Express
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export class AuthMiddleware {
  constructor(private readonly jwtAdapter: JwtAdapter) {}

  auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      res.status(401).json({ error: 'Token error' });
      return;
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ error: 'Token malformatted' });
      return;
    }

    const userId = await this.jwtAdapter.verify(token);

    if (!userId) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.userId = userId;
    
    next();
  };
} 