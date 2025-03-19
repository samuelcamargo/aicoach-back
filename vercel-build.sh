#!/bin/bash

# Este script é executado durante o build na Vercel

# Compilar TypeScript
echo "Compilando TypeScript..."
npm run build

# Verificar se a compilação foi bem-sucedida
if [ $? -ne 0 ]; then
  echo "Erro na compilação TypeScript"
  exit 1
fi

echo "Build concluído com sucesso!" 