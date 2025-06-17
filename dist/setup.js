"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestEnvironment = setupTestEnvironment;
exports.setupTestEnvironmentWalletOnly = setupTestEnvironmentWalletOnly;
exports.teardownTestEnvironment = teardownTestEnvironment;
const anvil_1 = require("@viem/anvil");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const bun_1 = require("bun");
const tokenTestUtils_1 = require("./utils/tokenTestUtils");
// Import contract artifacts
const ERC20EscrowObligation_json_1 = __importDefault(require("./contracts/ERC20EscrowObligation.json"));
const ERC20PaymentObligation_json_1 = __importDefault(require("./contracts/ERC20PaymentObligation.json"));
const ERC721EscrowObligation_json_1 = __importDefault(require("./contracts/ERC721EscrowObligation.json"));
const ERC721PaymentObligation_json_1 = __importDefault(require("./contracts/ERC721PaymentObligation.json"));
const ERC1155EscrowObligation_json_1 = __importDefault(require("./contracts/ERC1155EscrowObligation.json"));
const ERC1155PaymentObligation_json_1 = __importDefault(require("./contracts/ERC1155PaymentObligation.json"));
const TokenBundleEscrowObligation_json_1 = __importDefault(require("./contracts/TokenBundleEscrowObligation.json"));
const TokenBundlePaymentObligation_json_1 = __importDefault(require("./contracts/TokenBundlePaymentObligation.json"));
const ERC20BarterCrossToken_json_1 = __importDefault(require("./contracts/ERC20BarterCrossToken.json"));
const ERC721BarterCrossToken_json_1 = __importDefault(require("./contracts/ERC721BarterCrossToken.json"));
const ERC1155BarterCrossToken_json_1 = __importDefault(require("./contracts/ERC1155BarterCrossToken.json"));
const TokenBundleBarterUtils_json_1 = __importDefault(require("./contracts/TokenBundleBarterUtils.json"));
const AttestationBarterUtils_json_1 = __importDefault(require("./contracts/AttestationBarterUtils.json"));
const AttestationEscrowObligation_json_1 = __importDefault(require("./contracts/AttestationEscrowObligation.json"));
const AttestationEscrowObligation2_json_1 = __importDefault(require("./contracts/AttestationEscrowObligation2.json"));
const StringObligation_json_1 = __importDefault(require("./contracts/StringObligation.json"));
const TrivialArbiter_json_1 = __importDefault(require("./contracts/TrivialArbiter.json"));
const TrustedOracleArbiter_json_1 = __importDefault(require("./contracts/TrustedOracleArbiter.json"));
const TrustedPartyArbiter_json_1 = __importDefault(require("./contracts/TrustedPartyArbiter.json"));
const SpecificAttestationArbiter_json_1 = __importDefault(require("./contracts/SpecificAttestationArbiter.json"));
const AnyArbiter_json_1 = __importDefault(require("./contracts/AnyArbiter.json"));
const AllArbiter_json_1 = __importDefault(require("./contracts/AllArbiter.json"));
const IntrinsicsArbiter_json_1 = __importDefault(require("./contracts/IntrinsicsArbiter.json"));
const IntrinsicsArbiter2_json_1 = __importDefault(require("./contracts/IntrinsicsArbiter2.json"));
// Import implementation contracts from fixtures
const EAS_json_1 = __importDefault(require("./fixtures/EAS.json"));
const SchemaRegistry_json_1 = __importDefault(require("./fixtures/SchemaRegistry.json"));
const MockERC20Permit_json_1 = __importDefault(require("./fixtures/MockERC20Permit.json"));
const MockERC721_json_1 = __importDefault(require("./fixtures/MockERC721.json"));
const MockERC1155_json_1 = __importDefault(require("./fixtures/MockERC1155.json"));
/**
 * Sets up a complete test environment for Alkahest tests
 *
 * This function:
 * 1. Launches an Anvil instance
 * 2. Sets up test accounts with ETH
 * 3. Deploys all core contracts (EAS, obligations, arbiters, etc.)
 * 4. Deploys mock tokens for testing
 * 5. Distributes mock tokens to test accounts
 * 6. Creates Alkahest clients for each test account
 *
 * @param makeClient - Function to create Alkahest clients from wallet clients
 * @returns TestContext object with all necessary test resources
 */
async function setupTestEnvironment(makeClient) {
    const anvil = (0, anvil_1.createAnvil)();
    await anvil.start();
    const chain = chains_1.foundry;
    const transport = (0, viem_1.http)("http://127.0.0.1:8545", {
        timeout: 60000,
    });
    // Create test accounts
    const aliceAccount = (0, accounts_1.privateKeyToAccount)((0, accounts_1.generatePrivateKey)(), {
        nonceManager: viem_1.nonceManager,
    });
    const bobAccount = (0, accounts_1.privateKeyToAccount)((0, accounts_1.generatePrivateKey)(), {
        nonceManager: viem_1.nonceManager,
    });
    const alice = aliceAccount.address;
    const bob = bobAccount.address;
    // Create test client for deployment
    const testClient = (0, viem_1.createTestClient)({
        mode: "anvil",
        account: (0, accounts_1.privateKeyToAccount)((0, accounts_1.generatePrivateKey)(), {
            nonceManager: viem_1.nonceManager,
        }),
        chain,
        transport,
    })
        .extend(viem_1.walletActions)
        .extend(viem_1.publicActions)
        .extend((0, tokenTestUtils_1.createTokenTestExtension)());
    // Fund accounts with ETH
    await testClient.setBalance({
        address: testClient.account.address,
        value: (0, viem_1.parseEther)("10"),
    });
    await testClient.setBalance({
        address: alice,
        value: (0, viem_1.parseEther)("10"),
    });
    await testClient.setBalance({
        address: bob,
        value: (0, viem_1.parseEther)("10"),
    });
    // Create wallet clients for accounts
    const aliceWalletClient = (0, viem_1.createWalletClient)({
        account: aliceAccount,
        chain,
        transport,
        pollingInterval: 1000,
    }).extend(viem_1.publicActions);
    const bobWalletClient = (0, viem_1.createWalletClient)({
        account: bobAccount,
        chain,
        transport,
        pollingInterval: 1000,
    }).extend(viem_1.publicActions);
    // Initialize addresses object
    const addresses = {
        eas: "",
        easSchemaRegistry: "",
        trivialArbiter: "",
        trustedPartyArbiter: "",
        trustedOracleArbiter: "",
        specificAttestationArbiter: "",
        intrinsicsArbiter: "",
        intrinsicsArbiter2: "",
        anyArbiter: "",
        allArbiter: "",
        erc20EscrowObligation: "",
        erc20PaymentObligation: "",
        erc20BarterUtils: "",
        erc721EscrowObligation: "",
        erc721PaymentObligation: "",
        erc721BarterUtils: "",
        erc1155EscrowObligation: "",
        erc1155PaymentObligation: "",
        erc1155BarterUtils: "",
        tokenBundleEscrowObligation: "",
        tokenBundlePaymentObligation: "",
        tokenBundleBarterUtils: "",
        attestationEscrowObligation: "",
        attestationEscrowObligation2: "",
        attestationBarterUtils: "",
        stringObligation: "",
    };
    const mockAddresses = {
        erc20A: "",
        erc20B: "",
        erc721A: "",
        erc721B: "",
        erc1155A: "",
        erc1155B: "",
    };
    // Helper to deploy contracts
    async function deployContract(contract, args = []) {
        const hash = await testClient.deployContract({
            abi: contract.abi,
            bytecode: contract.bytecode.object,
            args,
        });
        const receipt = await testClient.waitForTransactionReceipt({ hash });
        return receipt.contractAddress;
    }
    // Deploy EAS contracts
    addresses.easSchemaRegistry = await deployContract(SchemaRegistry_json_1.default);
    addresses.eas = await deployContract(EAS_json_1.default, [addresses.easSchemaRegistry]);
    // Deploy arbiters
    addresses.trivialArbiter = await deployContract(TrivialArbiter_json_1.default);
    addresses.trustedPartyArbiter = await deployContract(TrustedPartyArbiter_json_1.default);
    addresses.trustedOracleArbiter = await deployContract(TrustedOracleArbiter_json_1.default, [
        addresses.eas,
    ]);
    addresses.specificAttestationArbiter = await deployContract(SpecificAttestationArbiter_json_1.default);
    addresses.intrinsicsArbiter = await deployContract(IntrinsicsArbiter_json_1.default);
    addresses.intrinsicsArbiter2 = await deployContract(IntrinsicsArbiter2_json_1.default);
    addresses.anyArbiter = await deployContract(AnyArbiter_json_1.default);
    addresses.allArbiter = await deployContract(AllArbiter_json_1.default);
    // Helper to deploy obligation contracts
    async function deployObligation(contract) {
        return deployContract(contract, [
            addresses.eas,
            addresses.easSchemaRegistry,
        ]);
    }
    // Deploy basic obligations
    addresses.erc20EscrowObligation = await deployObligation(ERC20EscrowObligation_json_1.default);
    addresses.erc20PaymentObligation = await deployObligation(ERC20PaymentObligation_json_1.default);
    addresses.erc721EscrowObligation = await deployObligation(ERC721EscrowObligation_json_1.default);
    addresses.erc721PaymentObligation = await deployObligation(ERC721PaymentObligation_json_1.default);
    addresses.erc1155EscrowObligation = await deployObligation(ERC1155EscrowObligation_json_1.default);
    addresses.erc1155PaymentObligation = await deployObligation(ERC1155PaymentObligation_json_1.default);
    addresses.tokenBundleEscrowObligation = await deployObligation(TokenBundleEscrowObligation_json_1.default);
    addresses.tokenBundlePaymentObligation = await deployObligation(TokenBundlePaymentObligation_json_1.default);
    addresses.attestationEscrowObligation = await deployObligation(AttestationEscrowObligation_json_1.default);
    addresses.attestationEscrowObligation2 = await deployObligation(AttestationEscrowObligation2_json_1.default);
    addresses.stringObligation = await deployObligation(StringObligation_json_1.default);
    // Deploy barter utils
    // ERC20 barter utils with cross-token functionality
    addresses.erc20BarterUtils = await deployContract(ERC20BarterCrossToken_json_1.default, [
        addresses.eas,
        addresses.erc20EscrowObligation,
        addresses.erc20PaymentObligation,
        addresses.erc721EscrowObligation,
        addresses.erc721PaymentObligation,
        addresses.erc1155EscrowObligation,
        addresses.erc1155PaymentObligation,
        addresses.tokenBundleEscrowObligation,
        addresses.tokenBundlePaymentObligation,
    ]);
    // ERC721 barter utils
    addresses.erc721BarterUtils = await deployContract(ERC721BarterCrossToken_json_1.default, [
        addresses.eas,
        addresses.erc20EscrowObligation,
        addresses.erc20PaymentObligation,
        addresses.erc721EscrowObligation,
        addresses.erc721PaymentObligation,
        addresses.erc1155EscrowObligation,
        addresses.erc1155PaymentObligation,
        addresses.tokenBundleEscrowObligation,
        addresses.tokenBundlePaymentObligation,
    ]);
    // ERC1155 barter utils
    addresses.erc1155BarterUtils = await deployContract(ERC1155BarterCrossToken_json_1.default, [
        addresses.eas,
        addresses.erc20EscrowObligation,
        addresses.erc20PaymentObligation,
        addresses.erc721EscrowObligation,
        addresses.erc721PaymentObligation,
        addresses.erc1155EscrowObligation,
        addresses.erc1155PaymentObligation,
        addresses.tokenBundleEscrowObligation,
        addresses.tokenBundlePaymentObligation,
    ]);
    // Token bundle barter utils
    addresses.tokenBundleBarterUtils = await deployContract(TokenBundleBarterUtils_json_1.default, [
        addresses.eas,
        addresses.tokenBundleEscrowObligation,
        addresses.tokenBundlePaymentObligation,
    ]);
    // Attestation barter utils
    addresses.attestationBarterUtils = await deployContract(AttestationBarterUtils_json_1.default, [
        addresses.eas,
        addresses.easSchemaRegistry,
        addresses.attestationEscrowObligation2,
    ]);
    // Deploy mock tokens
    mockAddresses.erc20A = await deployContract(MockERC20Permit_json_1.default, [
        "Token A",
        "TKA",
    ]);
    mockAddresses.erc20B = await deployContract(MockERC20Permit_json_1.default, [
        "Token B",
        "TKB",
    ]);
    mockAddresses.erc721A = await deployContract(MockERC721_json_1.default);
    mockAddresses.erc721B = await deployContract(MockERC721_json_1.default);
    mockAddresses.erc1155A = await deployContract(MockERC1155_json_1.default);
    mockAddresses.erc1155B = await deployContract(MockERC1155_json_1.default);
    // Distribute tokens to test accounts
    // Transfer ERC20 tokens
    await testClient.writeContract({
        address: mockAddresses.erc20A,
        abi: MockERC20Permit_json_1.default.abi,
        functionName: "transfer",
        args: [alice, (0, viem_1.parseEther)("1000")],
    });
    await testClient.writeContract({
        address: mockAddresses.erc20B,
        abi: MockERC20Permit_json_1.default.abi,
        functionName: "transfer",
        args: [bob, (0, viem_1.parseEther)("1000")],
    });
    // Mint NFTs to test accounts
    await testClient.writeContract({
        address: mockAddresses.erc721A,
        abi: MockERC721_json_1.default.abi,
        functionName: "mint",
        args: [alice],
    });
    await testClient.writeContract({
        address: mockAddresses.erc721B,
        abi: MockERC721_json_1.default.abi,
        functionName: "mint",
        args: [bob],
    });
    // Mint ERC1155 tokens
    await testClient.writeContract({
        address: mockAddresses.erc1155A,
        abi: MockERC1155_json_1.default.abi,
        functionName: "mint",
        args: [alice, 1n, 100n],
    });
    await testClient.writeContract({
        address: mockAddresses.erc1155B,
        abi: MockERC1155_json_1.default.abi,
        functionName: "mint",
        args: [bob, 1n, 100n],
    });
    // Create WebSocket clients for real-time event watching
    const aliceWalletClientWs = (0, viem_1.createWalletClient)({
        account: aliceAccount,
        chain,
        transport: (0, viem_1.webSocket)(`ws://localhost:${anvil.port}`),
        pollingInterval: 1000,
    }).extend(viem_1.publicActions);
    const bobWalletClientWs = (0, viem_1.createWalletClient)({
        account: bobAccount,
        chain,
        transport: (0, viem_1.webSocket)(`ws://localhost:${anvil.port}`),
        pollingInterval: 1000,
    }).extend(viem_1.publicActions);
    // Create Alkahest clients using the provided makeClient function
    const aliceClient = makeClient(aliceWalletClient, addresses);
    const bobClient = makeClient(bobWalletClient, addresses);
    const aliceClientWs = makeClient(aliceWalletClientWs, addresses);
    const bobClientWs = makeClient(bobWalletClientWs, addresses);
    // Capture initial state for test resets
    const anvilInitState = await testClient.dumpState();
    return {
        anvil,
        testClient,
        anvilInitState,
        alice,
        bob,
        aliceClient,
        bobClient,
        aliceClientWs,
        bobClientWs,
        aliceWalletClient,
        bobWalletClient,
        aliceWalletClientWs,
        bobWalletClientWs,
        addresses,
        mockAddresses,
    };
}
/**
 * Sets up a test environment without Alkahest clients (wallet clients only)
 * This is useful for projects that want to create their own clients or use the wallet clients directly
 *
 * @returns TestContext object with wallet clients but null Alkahest clients
 */
async function setupTestEnvironmentWalletOnly() {
    // Mock makeClient function that returns null
    const mockMakeClient = () => null;
    return setupTestEnvironment(mockMakeClient);
}
/**
 * Tears down the test environment
 * @param context The test context to tear down
 */
async function teardownTestEnvironment(context) {
    await (0, bun_1.$) `pkill anvil`;
}
