// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["C:/Users/mar_k/Documents/Web/NextJs/test-app/jest.setup.ts"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
