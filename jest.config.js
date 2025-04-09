/** @type {import('jest').Config} */
module.exports = {
  // Configuração do ambiente de testes simulando um navegador
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Configuração do Babel para transpilar arquivos JS/JSX
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },

  // Mapeamento de módulos para arquivos não-JavaScript (CSS, imagens) e aliases
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1' 
  },

  // Padrões para localização dos arquivos de teste
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
  ],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/node_modules/'],

  // Configurações de cobertura de código e arquivos a serem analisados
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx}',
    '!src/**/*.stories.{js,jsx}'
  ]
}