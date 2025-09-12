# DataGenerator (cypress/support/utils/TestDataObjects/DataGenerator)

Small generators for creating concrete test objects used in Topaz and address-related tests. Emit deterministic or randomised fixtures for use in tests and env builders.

## Files

- DataGenerator_Address.ts  
  - Purpose: generate UK address objects (valid formats, optional randomisation).  
  - Use: call to produce address fixtures for form inputs, CSV rows, or mapping tests.

- DataGenerator_TopazApplicant.ts  
  - Purpose: generate full Topaz applicant payloads (variants, seeded/random modes).  
  - Use: use to create applicant fixtures for end-to-end flows or unit tests.

- DataGenerator_TopazApplicantOtherDetails.ts  
  - Purpose: generate supplemental applicant details (extra fields, optional edge cases).  
  - Use: merge with applicant payloads to test optional fields, defaults and validation.

## Quick usage

- Import and call generator functions to produce fixtures:
  - TS: `import { makeApplicant } from './DataGenerator_TopazApplicant';`
  - Example: `const applicant = makeApplicant({ seeded: true });`
- Combine generators to build complete payloads before sending or asserting in tests.
