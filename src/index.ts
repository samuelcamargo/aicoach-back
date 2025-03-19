import { config } from 'dotenv';
import app from './main/config/app';
import { connectDB } from './infra/database/mongodb/connection';

config();

const PORT = process.env.PORT || 3000;

// Para compatibilidade com a Vercel
export default app;

// Inicia o servidor apenas se não estiver rodando na Vercel
if (process.env.NODE_ENV !== 'production') {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
      });
    })
    .catch((error) => {
      console.error('Database connection error:', error);
    });
} 