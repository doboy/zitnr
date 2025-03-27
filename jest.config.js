module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.(ts)', '**/?(*.)+(spec|test).(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
