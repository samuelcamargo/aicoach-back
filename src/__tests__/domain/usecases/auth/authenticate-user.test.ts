import { AuthenticateUser } from '../../../../domain/usecases/auth/authenticate-user.usecase';
import { UserRepository } from '../../../../domain/repositories/user-repository.interface';
import { User, AccessLevel } from '../../../../domain/entities/user.entity';

describe('AuthenticateUser UseCase', () => {
  // Mocks
  const mockUser: User = {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid@email.com',
    phone: '12345678',
    login: 'valid_login',
    password: 'hashed_password',
    accessLevel: AccessLevel.USER,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockUserRepository: UserRepository = {
    findByLogin: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  const mockHashComparer = jest.fn();
  const mockTokenGenerator = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if no user is found with the provided login', async () => {
    // Arrange
    (mockUserRepository.findByLogin as jest.Mock).mockResolvedValueOnce(null);
    const sut = new AuthenticateUser(mockUserRepository, mockHashComparer, mockTokenGenerator);
    
    // Act & Assert
    await expect(
      sut.execute({ login: 'invalid_login', password: 'any_password' })
    ).rejects.toThrow('Invalid login or password');
    
    expect(mockUserRepository.findByLogin).toHaveBeenCalledWith('invalid_login');
  });

  it('should throw if password is invalid', async () => {
    // Arrange
    (mockUserRepository.findByLogin as jest.Mock).mockResolvedValueOnce(mockUser);
    mockHashComparer.mockResolvedValueOnce(false);
    const sut = new AuthenticateUser(mockUserRepository, mockHashComparer, mockTokenGenerator);
    
    // Act & Assert
    await expect(
      sut.execute({ login: 'valid_login', password: 'invalid_password' })
    ).rejects.toThrow('Invalid login or password');
    
    expect(mockUserRepository.findByLogin).toHaveBeenCalledWith('valid_login');
    expect(mockHashComparer).toHaveBeenCalledWith('invalid_password', 'hashed_password');
  });

  it('should return user data, token and expiresIn on successful authentication', async () => {
    // Arrange
    (mockUserRepository.findByLogin as jest.Mock).mockResolvedValueOnce(mockUser);
    mockHashComparer.mockResolvedValueOnce(true);
    mockTokenGenerator.mockResolvedValueOnce({ token: 'valid_token', expiresIn: '1d' });
    const sut = new AuthenticateUser(mockUserRepository, mockHashComparer, mockTokenGenerator);
    
    // Act
    const result = await sut.execute({ login: 'valid_login', password: 'valid_password' });
    
    // Assert
    expect(result).toEqual({
      user: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid@email.com',
        phone: '12345678',
        login: 'valid_login',
        accessLevel: AccessLevel.USER,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt
      },
      token: 'valid_token',
      expiresIn: '1d'
    });
    
    expect(mockUserRepository.findByLogin).toHaveBeenCalledWith('valid_login');
    expect(mockHashComparer).toHaveBeenCalledWith('valid_password', 'hashed_password');
    expect(mockTokenGenerator).toHaveBeenCalledWith('valid_id');
  });
}); 