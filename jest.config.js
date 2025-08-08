export const testEnvironment = "jsdom";
export const setupFilesAfterEnv = ["./jest.setup.ts"];
export const moduleNameMapper = {
    "^@/(.*)$": "./src/$1"
};
