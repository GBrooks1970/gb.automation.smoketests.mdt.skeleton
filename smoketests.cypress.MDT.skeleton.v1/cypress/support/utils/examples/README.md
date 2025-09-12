# examples (cypress/support/utils/examples)

Small collection of example data and helpers demonstrating usage patterns and providing reusable sample fixtures for tests.

## Files

- example-data-fixed.ts  
  - Purpose: fixed, deterministic example fixtures (stable values for assertions).  
  - Use: import when you need predictable data for assertions or regression tests.

- example-data-util.ts  
  - Purpose: helper functions to transform or generate example data (merge, clone, apply overrides).  
  - Use: call utilities to adapt example fixtures to specific test scenarios.

- example-data.ts  
  - Purpose: sample/randomised example objects (variants used in smoke/feature tests).  
  - Use: import for seeding tests where variety is desired or to illustrate payload shapes.

- README.md  
  - This file: index and quick usage notes.

## Quick usage

- Import examples:
  - TS: `import fixed from './examples/example-data-fixed';`  
  - Use util to adapt: `import { applyOverrides } from './examples/example-data-util'; const payload = applyOverrides(fixed, { id: 'X' });`
