# Alkahest Testing Environment

A testing environment setup for Alkahest -  testing with Anvil, contract deployments, and test accounts.

## Overview

This package provides a comprehensive testing setup for Alkahest projects, including:

- **Anvil Integration**: Automated local blockchain setup using Anvil
- **Contract Deployment**: All Alkahest contracts pre-deployed and configured
- **Test Accounts**: Pre-funded accounts with mock tokens
- **Token Utilities**: Helper functions for testing with ERC20, ERC721, and ERC1155 tokens
- **Type Safety**: Full TypeScript support with proper type definitions

## Installation

```bash
npm install alkahest-ts-test-setup
# or
yarn add alkahest-ts-test-setup
# or
bun add alkahest-ts-test-setup
```

## Requirements

- [Bun](https://bun.sh/) runtime
- [ArkType](https://arktype.io/) for type validation (peer dependency)

## Quick Start

```typescript
import { setupTestEnvironment, teardownTestEnvironment } from 'alkahest-ts-test-setup';

// Setup test environment
const testContext = await setupTestEnvironment();

// Access test accounts
const { alice, bob, addresses, mockAddresses } = testContext;

// Use Alkahest clients (you'll need to create these with your makeClient function)
// const aliceClient = makeClient(testContext.aliceWalletClient, addresses);
// const bobClient = makeClient(testContext.bobWalletClient, addresses);

// Run your tests here...

// Cleanup
await teardownTestEnvironment(testContext);
```

## Test Context

The `setupTestEnvironment()` function returns a `TestContext` object containing:

### Accounts and Clients
- `alice` / `bob`: Test account addresses
- `aliceWalletClient` / `bobWalletClient`: Viem wallet clients
- `aliceWalletClientWs` / `bobWalletClientWs`: WebSocket clients for real-time events
- `testClient`: Test client with deployment capabilities

### Contract Addresses
- **EAS**: Ethereum Attestation Service contracts
- **Arbiters**: Various arbiter implementations (Trivial, TrustedParty, etc.)
- **Obligations**: ERC20, ERC721, ERC1155, TokenBundle, Attestation obligations
- **Barter Utils**: Cross-token barter utilities

### Mock Tokens
- `erc20A` / `erc20B`: Mock ERC20 tokens
- `erc721A` / `erc721B`: Mock ERC721 tokens  
- `erc1155A` / `erc1155B`: Mock ERC1155 tokens

## Token Testing Utilities

```typescript
import { createTokenTestExtension, getErc20Balance } from 'alkahest-ts-test-setup';

// Extend your test client with token utilities
const testClient = createTestClient(/* config */)
  .extend(publicActions)
  .extend(createTokenTestExtension());

// Check token balances
const balance = await testClient.getErc20Balance(
  { address: mockAddresses.erc20A },
  alice
);

// Or use standalone functions
const balance2 = await getErc20Balance(testClient, mockAddresses.erc20A, alice);
```

## Example Test

```typescript
import { test, expect, beforeAll, afterAll } from 'bun:test';
import { parseEther } from 'viem';
import { setupTestEnvironment, teardownTestEnvironment, type TestContext } from 'alkahest-ts-test-setup';

let testContext: TestContext;

beforeAll(async () => {
  testContext = await setupTestEnvironment();
});

afterAll(async () => {
  await teardownTestEnvironment(testContext);
});

test('should have funded accounts', async () => {
  const { alice, aliceWalletClient } = testContext;
  
  const balance = await aliceWalletClient.getBalance({ address: alice });
  expect(balance).toBeGreaterThan(parseEther('5'));
});

test('should have deployed contracts', async () => {
  const { addresses } = testContext;
  
  expect(addresses.eas).toMatch(/^0x[a-fA-F0-9]{40}$/);
  expect(addresses.erc20EscrowObligation).toMatch(/^0x[a-fA-F0-9]{40}$/);
});

test('should have distributed mock tokens', async () => {
  const { alice, mockAddresses, testClient } = testContext;
  
  const balance = await testClient.getErc20Balance(
    { address: mockAddresses.erc20A },
    alice
  );
  expect(balance).toBe(parseEther('1000'));
});
```

## Integration with Alkahest

To use this testing environment with your Alkahest project:

1. Install this package as a dev dependency
2. Remove the existing test setup from your project
3. Update your tests to use this package:

```typescript
// Before (in your Alkahest project)
import { setupTestEnvironment } from './tests/utils/setup';

// After 
import { setupTestEnvironment } from 'alkahest-ts-test-setup';
```

## Available Exports

- `setupTestEnvironment()` - Main setup function
- `teardownTestEnvironment()` - Cleanup function
- `TestContext` - TypeScript type for test context
- `createTokenTestExtension()` - Token testing utilities
- `compareAddresses()` - Address comparison helper
- Token utility functions: `getErc20Balance`, `getERC721Owner`, `getERC1155Balance`
- All contract artifacts and fixtures

## Development

To build the package:

```bash
npm run build
```

To run tests:

```bash
npm test
```

## License

MIT

## Contributing

This package is designed to be used with Alkahest projects. For issues or feature requests, please open an issue in the repository.
