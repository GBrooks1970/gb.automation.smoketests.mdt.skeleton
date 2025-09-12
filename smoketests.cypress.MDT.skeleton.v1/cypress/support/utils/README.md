# Utils (cypress/support/utils)

Lightweight utility collection used across Cypress smoke tests: helpers for data mapping/picking, date/string/array ops, deep equality, constants, and common algorithms.

## Files

- README.md  
  - This file: index and quick usage notes.

- common-utils.ts  
  - General helpers and small algorithms (isPrime, palindrome checks, digit frequency, etc.).  
  - Use: import CommonUtils and call static methods for quick checks and small computations.

- DataMapper.ts  
  - Transform objects between shapes (DTO ↔ model) via mapping rules.  
  - Use: run mappings to prepare fixtures or convert API payloads.

- DataPickerUtil.ts  
  - Safe nested property access and defaulting (path-based getters).  
  - Use: DataPickerUtil.get(obj, 'a.b.c', defaultValue) to avoid undefined errors.

- date-utils.ts  
  - Date/time helpers (formatting, offsets, comparisons).  
  - Use: generate/normalize test timestamps and assert ranges.

- deepEqual-util.ts  
  - Deep structural equality for objects/arrays.  
  - Use: compare complex fixtures or responses in assertions.

- flatten-util.ts  
  - Flatten nested arrays/objects to single-level structures or key paths.  
  - Use: simplify structures before comparison or mapping.

- MappingUtils.ts  
  - Composition and utilities for building mapping pipelines.  
  - Use: create reusable transformation pipelines from smaller mappers.

- string-utils.ts  
  - String helpers (trim, sanitize, casing, random strings).  
  - Use: generate test strings and normalize text for assertions.

- symbol-consts.ts  
  - Shared Symbol keys to attach non-colliding metadata.  
  - Use: import symbols to tag objects without clashing with normal keys.

- UCAS-consts.ts  
  - Domain-specific constants (UCAS codes, enums, defaults).  
  - Use: import constants to build fixtures and avoid magic literals.

## Quick usage

- Import a helper:
  - TypeScript: `import CommonUtils from './utils/common-utils';`
  - JS: `const { DataMapper } = require('./utils/DataMapper');`
- Common pattern: use static helpers for single ops; use mappers/pipelines to transform fixtures during test setup.

Keep this README up to date with any new utilities or usage examples.
