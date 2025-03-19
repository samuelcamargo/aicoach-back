#!/bin/bash

# Garantir que as variáveis de ambiente são copiadas para o .env
echo "NODE_ENV=production" > .env
echo "MONGODB_URI=$MONGO_URI" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "JWT_EXPIRES_IN=7d" >> .env
echo "PORT=3000" >> .env

# Executar o build normal
npm run build 