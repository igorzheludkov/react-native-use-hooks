module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'src'],
  modulePathIgnorePatterns: ['dist',],
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
};