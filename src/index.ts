// Main exports
export {
  setupTestEnvironment,
  setupTestEnvironmentWalletOnly,
  teardownTestEnvironment,
  type TestContext,
  type MakeClientFunction,
} from "./setup";

// Token test utilities
export {
  createTokenTestExtension,
  compareAddresses,
  getErc20Balance,
  getERC721Owner,
  getERC1155Balance,
  type AlkahestTestActions,
} from "./utils/tokenTestUtils";

// Contract fixtures
export { default as EAS } from "./fixtures/EAS.json";
export { default as SchemaRegistry } from "./fixtures/SchemaRegistry.json";
export { default as MockERC20Permit } from "./fixtures/MockERC20Permit.json";
export { default as MockERC721 } from "./fixtures/MockERC721.json";
export { default as MockERC1155 } from "./fixtures/MockERC1155.json";

// Contract artifacts
export { default as ERC20EscrowObligation } from "./contracts/ERC20EscrowObligation.json";
export { default as ERC20PaymentObligation } from "./contracts/ERC20PaymentObligation.json";
export { default as ERC721EscrowObligation } from "./contracts/ERC721EscrowObligation.json";
export { default as ERC721PaymentObligation } from "./contracts/ERC721PaymentObligation.json";
export { default as ERC1155EscrowObligation } from "./contracts/ERC1155EscrowObligation.json";
export { default as ERC1155PaymentObligation } from "./contracts/ERC1155PaymentObligation.json";
export { default as TokenBundleEscrowObligation } from "./contracts/TokenBundleEscrowObligation.json";
export { default as TokenBundlePaymentObligation } from "./contracts/TokenBundlePaymentObligation.json";
export { default as ERC20BarterCrossToken } from "./contracts/ERC20BarterCrossToken.json";
export { default as ERC721BarterCrossToken } from "./contracts/ERC721BarterCrossToken.json";
export { default as ERC1155BarterCrossToken } from "./contracts/ERC1155BarterCrossToken.json";
export { default as TokenBundleBarterUtils } from "./contracts/TokenBundleBarterUtils.json";
export { default as AttestationBarterUtils } from "./contracts/AttestationBarterUtils.json";
export { default as AttestationEscrowObligation } from "./contracts/AttestationEscrowObligation.json";
export { default as AttestationEscrowObligation2 } from "./contracts/AttestationEscrowObligation2.json";
export { default as StringObligation } from "./contracts/StringObligation.json";
export { default as TrivialArbiter } from "./contracts/TrivialArbiter.json";
export { default as TrustedOracleArbiter } from "./contracts/TrustedOracleArbiter.json";
export { default as TrustedPartyArbiter } from "./contracts/TrustedPartyArbiter.json";
export { default as SpecificAttestationArbiter } from "./contracts/SpecificAttestationArbiter.json";
export { default as AnyArbiter } from "./contracts/AnyArbiter.json";
export { default as AllArbiter } from "./contracts/AllArbiter.json";
export { default as IntrinsicsArbiter } from "./contracts/IntrinsicsArbiter.json";
export { default as IntrinsicsArbiter2 } from "./contracts/IntrinsicsArbiter2.json";
