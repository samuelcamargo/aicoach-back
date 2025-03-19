import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export class JwtAdapter {
  constructor(private readonly secret: string, private readonly expiresIn: string) {}

  async generate(userId: string): Promise<{ token: string; expiresIn: number }> {
    // Calcular o timestamp de expiração baseado na string de configuração
    // Por exemplo, se expiresIn for "1d", precisamos calcular quantos segundos são 1 dia
    // e depois adicionar ao timestamp atual
    const timeValues: Record<string, number> = {
      's': 1,           // segundos
      'm': 60,          // minutos em segundos
      'h': 60 * 60,     // horas em segundos
      'd': 24 * 60 * 60 // dias em segundos
    };

    // Parsear o valor de expiresIn (exemplo: "1d" -> 1 dia em segundos)
    let expiresInSeconds = 0;
    if (this.expiresIn) {
      const unit = this.expiresIn.slice(-1);
      const value = parseInt(this.expiresIn.slice(0, -1), 10);
      
      if (!isNaN(value) && timeValues[unit]) {
        expiresInSeconds = value * timeValues[unit];
      } else {
        // Se o formato não for reconhecido, usa o padrão de 1 dia
        expiresInSeconds = 24 * 60 * 60; // 1 dia em segundos
      }
    } else {
      // Se não houver configuração, usa o padrão de 1 dia
      expiresInSeconds = 24 * 60 * 60; // 1 dia em segundos
    }

    // Calcular timestamp de expiração (tempo atual + segundos de expiração)
    const expirationTimestamp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    
    // Gerar o token com a mesma configuração de expiração
    const token = jwt.sign(
      { id: userId }, 
      this.secret as Secret, 
      { expiresIn: this.expiresIn } as SignOptions
    );
    
    return {
      token,
      expiresIn: expirationTimestamp
    };
  }

  async verify(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, this.secret as Secret) as { id: string; exp: number };
      
      // Verificar se o token está expirado
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTimestamp) {
        // Token expirado
        return null;
      }
      
      return decoded.id;
    } catch (_error) {
      return null;
    }
  }
} 