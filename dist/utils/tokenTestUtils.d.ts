import type { Client, PublicActions, TestClient } from "viem";
export declare function compareAddresses(a: string, b: string): boolean;
export type AlkahestTestActions = ReturnType<ReturnType<typeof createTokenTestExtension>>;
export declare function createTokenTestExtension<C extends Client & PublicActions>(): (client: C) => {
    getErc20Balance(token: {
        address: `0x${string}`;
    }, owner: `0x${string}`): Promise<bigint>;
    getErc721Owner(token: {
        address: `0x${string}`;
        id: bigint;
    }): Promise<`0x${string}`>;
    getErc1155Balance(token: {
        address: `0x${string}`;
        id: bigint;
    }, owner: `0x${string}`): Promise<bigint>;
};
export declare function getErc20Balance(testClient: TestClient & PublicActions, tokenAddress: `0x${string}`, ownerAddress: `0x${string}`): Promise<bigint>;
export declare function getERC721Owner(testClient: TestClient & PublicActions, tokenAddress: `0x${string}`, tokenId: bigint): Promise<`0x${string}`>;
export declare function getERC1155Balance(testClient: TestClient & PublicActions, tokenAddress: `0x${string}`, ownerAddress: `0x${string}`, tokenId: bigint): Promise<bigint>;
//# sourceMappingURL=tokenTestUtils.d.ts.map