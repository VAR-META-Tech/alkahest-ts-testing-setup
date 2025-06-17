import { createAnvil } from "@viem/anvil";
import { createWalletClient, type PublicActions, type WalletActions, type TestClient } from "viem";
import { type AlkahestTestActions } from "./utils/tokenTestUtils";
export type TestContext = {
    anvil: ReturnType<typeof createAnvil>;
    testClient: TestClient & WalletActions & PublicActions & AlkahestTestActions;
    anvilInitState?: `0x${string}`;
    alice: `0x${string}`;
    bob: `0x${string}`;
    aliceWalletClient: ReturnType<typeof createWalletClient> & PublicActions;
    bobWalletClient: ReturnType<typeof createWalletClient> & PublicActions;
    aliceWalletClientWs: ReturnType<typeof createWalletClient> & PublicActions;
    bobWalletClientWs: ReturnType<typeof createWalletClient> & PublicActions;
    addresses: {
        eas: `0x${string}`;
        easSchemaRegistry: `0x${string}`;
        trivialArbiter: `0x${string}`;
        trustedPartyArbiter: `0x${string}`;
        trustedOracleArbiter: `0x${string}`;
        specificAttestationArbiter: `0x${string}`;
        intrinsicsArbiter: `0x${string}`;
        intrinsicsArbiter2: `0x${string}`;
        anyArbiter: `0x${string}`;
        allArbiter: `0x${string}`;
        erc20EscrowObligation: `0x${string}`;
        erc20PaymentObligation: `0x${string}`;
        erc20BarterUtils: `0x${string}`;
        erc721EscrowObligation: `0x${string}`;
        erc721PaymentObligation: `0x${string}`;
        erc721BarterUtils: `0x${string}`;
        erc1155EscrowObligation: `0x${string}`;
        erc1155PaymentObligation: `0x${string}`;
        erc1155BarterUtils: `0x${string}`;
        tokenBundleEscrowObligation: `0x${string}`;
        tokenBundlePaymentObligation: `0x${string}`;
        tokenBundleBarterUtils: `0x${string}`;
        attestationEscrowObligation: `0x${string}`;
        attestationEscrowObligation2: `0x${string}`;
        attestationBarterUtils: `0x${string}`;
        stringObligation: `0x${string}`;
    };
    mockAddresses: {
        erc20A: `0x${string}`;
        erc20B: `0x${string}`;
        erc721A: `0x${string}`;
        erc721B: `0x${string}`;
        erc1155A: `0x${string}`;
        erc1155B: `0x${string}`;
    };
};
/**
 * Sets up a complete test environment for Alkahest tests
 *
 * This function:
 * 1. Launches an Anvil instance
 * 2. Sets up test accounts with ETH
 * 3. Deploys all core contracts (EAS, obligations, arbiters, etc.)
 * 4. Deploys mock tokens for testing
 * 5. Distributes mock tokens to test accounts
 * 6. Creates wallet clients for each test account
 *
 * @returns TestContext object with all necessary test resources
 */
export declare function setupTestEnvironment(): Promise<TestContext>;
/**
 * Tears down the test environment
 * @param context The test context to tear down
 */
export declare function teardownTestEnvironment(context: TestContext): Promise<void>;
//# sourceMappingURL=setup.d.ts.map