import { User } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user-repository.interface';
import UserModel, { UserDocument } from '../models/user.model';

export class MongoUserRepository implements UserRepository {
  private userDocumentToEntity(userDoc: UserDocument): User {
    return {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      phone: userDoc.phone,
      login: userDoc.login,
      password: userDoc.password,
      accessLevel: userDoc.accessLevel,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt
    };
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = new UserModel(userData);
    const savedUser = await user.save();
    return this.userDocumentToEntity(savedUser);
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(id);
      return user ? this.userDocumentToEntity(user) : null;
    } catch (_error) {
      return null;
    }
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await UserModel.findOne({ login });
    return user ? this.userDocumentToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? this.userDocumentToEntity(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map(user => this.userDocumentToEntity(user));
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { ...userData, updatedAt: new Date() },
        { new: true }
      );
      return updatedUser ? this.userDocumentToEntity(updatedUser) : null;
    } catch (_error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return !!result;
    } catch (_error) {
      return false;
    }
  }
} 