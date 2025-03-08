import "@testing-library/jest-dom";

// Polyfill for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ["src/config.ts", "src/setupTests.ts", "src/types.ts"],
};
