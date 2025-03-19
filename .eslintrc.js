// Este arquivo é apenas um wrapper para carregar as configurações de .eslintrc.ts
// Isso é necessário porque o ESLint não suporta nativamente arquivos de configuração TypeScript

require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});

module.exports = require('./.eslintrc.ts').default; 