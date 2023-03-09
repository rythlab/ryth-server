module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  transform: {
    '^.+\\.graphql$': 'jest-transform-graphql',
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['graphql', 'js', 'json', 'node', 'ts'],
  collectCoverage: false,
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFiles: ['./src/__test__/setup.ts']
};
