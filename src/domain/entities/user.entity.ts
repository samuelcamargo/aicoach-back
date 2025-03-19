export enum AccessLevel {
  ADMIN = 'admin',
  USER = 'user',
  CLIENT = 'cliente'
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
  accessLevel: AccessLevel;
  createdAt?: Date;
  updatedAt?: Date;
} 