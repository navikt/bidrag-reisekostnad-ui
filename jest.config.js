const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["/node_modules/(?!(nav-.+)/)", "^.+\\.(css|sass|scss)$"],
};

module.exports = createJestConfig(customJestConfig);
