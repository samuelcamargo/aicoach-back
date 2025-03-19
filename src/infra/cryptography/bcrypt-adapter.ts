import bcrypt from 'bcrypt';

export class BcryptAdapter {
  constructor(private readonly salt: number = 12) {}

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
} 