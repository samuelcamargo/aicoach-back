import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../domain/usecases/user/create-user.usecase';
import { GetUserUseCase } from '../../domain/usecases/user/get-user.usecase';
import { GetAllUsersUseCase } from '../../domain/usecases/user/get-all-users.usecase';
import { UpdateUserUseCase } from '../../domain/usecases/user/update-user.usecase';
import { DeleteUserUseCase } from '../../domain/usecases/user/delete-user.usecase';

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, phone, login, password, accessLevel } = req.body;

      if (!name || !email || !phone || !login || !password || !accessLevel) {
        return res.status(400).json({ 
          error: 'Missing required fields: name, email, phone, login, password, accessLevel' 
        });
      }

      // Log para debug
      console.log('Criando usuário com os dados:', {
        name, email, phone, login, accessLevel
      });

      const user = await this.createUserUseCase.execute({
        name,
        email,
        phone,
        login,
        password,
        accessLevel
      });

      return res.status(201).json(user);
    } catch (error) {
      // Log detalhado do erro
      console.error('Erro ao criar usuário:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('already in use')) {
          return res.status(409).json({ error: error.message });
        }
        
        // Em ambiente de desenvolvimento, mostrar o erro completo
        if (process.env.NODE_ENV === 'development') {
          return res.status(500).json({ 
            error: 'Internal server error', 
            details: error.message,
            stack: error.stack
          });
        }
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const user = await this.getUserUseCase.execute(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (_error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (_error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email, phone, login, password, accessLevel } = req.body;

      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
      }

      const updatedUser = await this.updateUserUseCase.execute(id, {
        name,
        email,
        phone,
        login,
        password,
        accessLevel
      });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('already in use')) {
          return res.status(409).json({ error: error.message });
        }
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleted = await this.deleteUserUseCase.execute(id);

      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(204).send();
    } catch (_error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
} 