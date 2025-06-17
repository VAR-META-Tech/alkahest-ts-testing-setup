"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareAddresses = compareAddresses;
exports.createTokenTestExtension = createTokenTestExtension;
exports.getErc20Balance = getErc20Balance;
exports.getERC721Owner = getERC721Owner;
exports.getERC1155Balance = getERC1155Balance;
const MockERC20Permit_json_1 = __importDefault(require("../fixtures/MockERC20Permit.json"));
const MockERC721_json_1 = __importDefault(require("../fixtures/MockERC721.json"));
const MockERC1155_json_1 = __importDefault(require("../fixtures/MockERC1155.json"));
// Helper to compare addresses with normalization
function compareAddresses(a, b) {
    return a.toLowerCase() === b.toLowerCase();
}
// Create token testing extensions that can be added to viem clients
function createTokenTestExtension() {
    return (client) => ({
        // Get ERC20 token balance
        async getErc20Balance(token, owner) {
            return client.readContract({
                address: token.address,
                abi: MockERC20Permit_json_1.default.abi,
                functionName: "balanceOf",
                args: [owner],
            });
        },
        // Get ERC721 token owner
        async getErc721Owner(token) {
            return client.readContract({
                address: token.address,
                abi: MockERC721_json_1.default.abi,
                functionName: "ownerOf",
                args: [token.id],
            });
        },
        // Get ERC1155 token balance
        async getErc1155Balance(token, owner) {
            return client.readContract({
                address: token.address,
                abi: MockERC1155_json_1.default.abi,
                functionName: "balanceOf",
                args: [owner, token.id],
            });
        },
    });
}
// Legacy utility functions for backward compatibility
// Utility function to check ERC20 balance
async function getErc20Balance(testClient, tokenAddress, ownerAddress) {
    return testClient.readContract({
        address: tokenAddress,
        abi: MockERC20Permit_json_1.default.abi,
        functionName: "balanceOf",
        args: [ownerAddress],
    });
}
// Utility function to check ERC721 owner
async function getERC721Owner(testClient, tokenAddress, tokenId) {
    return testClient.readContract({
        address: tokenAddress,
        abi: MockERC721_json_1.default.abi,
        functionName: "ownerOf",
        args: [tokenId],
    });
}
// Utility function to check ERC1155 balance
async function getERC1155Balance(testClient, tokenAddress, ownerAddress, tokenId) {
    return testClient.readContract({
        address: tokenAddress,
        abi: MockERC1155_json_1.default.abi,
        functionName: "balanceOf",
        args: [ownerAddress, tokenId],
    });
}
