import { UserController } from '../../presentation/controllers/user.controller';
import { CreateUser } from '../../domain/usecases/user/create-user.usecase';
import { GetUser } from '../../domain/usecases/user/get-user.usecase';
import { GetAllUsers } from '../../domain/usecases/user/get-all-users.usecase';
import { UpdateUser } from '../../domain/usecases/user/update-user.usecase';
import { DeleteUser } from '../../domain/usecases/user/delete-user.usecase';
import { MongoUserRepository } from '../../infra/database/mongodb/repositories/user.repository';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';

export const makeUserController = (): UserController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const userRepository = new MongoUserRepository();
  
  const createUserUseCase = new CreateUser(
    userRepository,
    bcryptAdapter.hash.bind(bcryptAdapter)
  );
  
  const getUserUseCase = new GetUser(userRepository);
  const getAllUsersUseCase = new GetAllUsers(userRepository);
  
  const updateUserUseCase = new UpdateUser(
    userRepository,
    bcryptAdapter.hash.bind(bcryptAdapter)
  );
  
  const deleteUserUseCase = new DeleteUser(userRepository);

  return new UserController(
    createUserUseCase,
    getUserUseCase,
    getAllUsersUseCase,
    updateUserUseCase,
    deleteUserUseCase
  );
}; 