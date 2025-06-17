# alkahest-test-env

A comprehensive test environment setup package for Alkahest protocol testing.

## Installation

```bash
npm install alkahest-test-env
# or
yarn add alkahest-test-env
# or
bun add alkahest-test-env
```

## Usage

```typescript
import { setupTestEnvironment, teardownTestEnvironment } from 'alkahest-test-env';

// In your test files
let testContext;

beforeAll(async () => {
  testContext = await setupTestEnvironment();
});

afterAll(async () => {
  await teardownTestEnvironment(testContext);
});

// Use testContext.aliceClient, testContext.bobClient, etc. in your tests
```

## What's Included

This package provides:

- **Complete test environment setup** with Anvil (local Ethereum node)
- **Pre-deployed contracts** including all Alkahest obligations, arbiters, and utilities
- **Mock tokens** (ERC20, ERC721, ERC1155) for testing
- **Test accounts** (Alice, Bob) with funded balances
- **Alkahest clients** ready to use with both HTTP and WebSocket transports
- **Utility functions** for token testing and address comparison

## API

### setupTestEnvironment()

Sets up a complete test environment and returns a `TestContext` object containing:

- `anvil`: The Anvil instance
- `testClient`: Extended test client with token utilities
- `alice`, `bob`: Test account addresses
- `aliceClient`, `bobClient`: Alkahest clients for test accounts
- `aliceClientWs`, `bobClientWs`: WebSocket-enabled Alkahest clients
- `addresses`: All deployed contract addresses
- `mockAddresses`: Mock token contract addresses
- `anvilInitState`: Initial blockchain state for test resets

### teardownTestEnvironment(context)

Cleans up the test environment by stopping the Anvil instance.

### Utility Functions

- `compareAddresses(a, b)`: Compare Ethereum addresses (case-insensitive)
- `createTokenTestExtension()`: Create token testing extensions for viem clients

## Example

```typescript
import { setupTestEnvironment, teardownTestEnvironment } from 'alkahest-test-env';
import { parseEther } from 'viem';

describe('My Alkahest Tests', () => {
  let testContext;

  beforeAll(async () => {
    testContext = await setupTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment(testContext);
  });

  test('should create an ERC20 escrow', async () => {
    const { aliceClient, bobClient, mockAddresses } = testContext;
    
    // Alice creates an escrow to trade her ERC20 tokens
    const { attested } = await aliceClient.erc20.permitAndBuyWithErc20(
      {
        address: mockAddresses.erc20A,
        value: parseEther('100'),
      },
      {
        arbiter: testContext.addresses.trivialArbiter,
        demand: '0x',
      },
      0n, // no expiration
    );

    expect(attested.uid).toBeDefined();
  });
});
```

## Dependencies

This package depends on:
- `alkahest-ts`: The main Alkahest protocol client
- `@viem/anvil`: Local Ethereum node for testing
- `viem`: Ethereum client library

## License

MIT
