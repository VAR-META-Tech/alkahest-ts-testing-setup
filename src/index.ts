// Export the main setup functions
export {
  setupTestEnvironment,
  teardownTestEnvironment,
  type TestContext,
} from "./setup";

// Export utility functions
export {
  createTokenTestExtension,
  compareAddresses,
  type AlkahestTestActions,
} from "./tokenTestUtils";

// Re-export types from alkahest-ts for convenience
export type {
  Erc20,
  Erc721,
  Erc1155,
  TokenBundle,
  ChainAddresses,
} from "alkahest-ts";
