# datatable (cypress/support/utils/datatable)

Lightweight helpers for building, parsing and normalizing test data tables used in Cypress smoke tests.

## Files

- DataTableUtils.ts  
  - Core datatable helpers: load/normalize rows, map column names, filter/find rows, apply simple transforms.  
  - Use: import to normalize fixtures or convert CSV/JS objects into test-ready row arrays.

- DataTableUtils_Address.ts  
  - Address-specific row utilities: build/validate address rows, map address columns to model fields.  
  - Use: generate address fixtures or assert address table data in tests.

- DataTableUtils_NominatedAccess.ts  
  - Nominated-access row helpers: construct and validate rows for nominated-access scenarios.  
  - Use: create test rows and expected values for nominated-access flows.

- DataTableUtils_ReferenceDetails.ts  
  - Reference-details helpers: build/parse reference-detail rows and map to payloads.  
  - Use: prepare reference fixtures and compare response objects.

- README.md  
  - This file: quick index and usage notes.

## Quick usage

- Import the specific util you need, then call its static/helper functions to prepare fixtures before test setup:
  - TypeScript: `import DataTableUtils from './datatable/DataTableUtils';`  
  - JS: `const DataTableUtils = require('./datatable/DataTableUtils');`
- Pattern: use core utils for generic table ops and specialized files for domain row builders.
