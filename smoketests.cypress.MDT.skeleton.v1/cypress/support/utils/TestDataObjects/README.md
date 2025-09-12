# TestDataObjects (cypress/support/utils/TestDataObjects)

Lightweight collection of concrete test data objects used to build fixtures and expected values for Topaz and form flows.

## Files

- TestData_MoreAboutYouAndExtraActivities_01.ts  
  - Purpose: example payload for "More About You" and extra activities section.  
  - Use: import to seed form data or assert UI sections related to activities.

- TestData_sampleObjectArray.ts  
  - Purpose: generic sample array of objects for list/iteration tests.  
  - Use: use in tests needing predictable collection data or mapping examples.

- TestData_topazApplicantOtherDetails_01.ts  
  - Purpose: supplemental Topaz applicant details (other details).  
  - Use: merge into Topaz applicant fixtures when extra fields are required.

- TestData_TopazApplicant_01.ts  
  - Purpose: primary Topaz applicant example payload (variant 1).  
  - Use: base fixture for applicant-related tests and payload validation.

- TestData_TopazApplicant_02.ts  
  - Purpose: alternate Topaz applicant example (variant 2).  
  - Use: use to test variations and branching logic in applicant flows.

- TestData_TopazApplicant_DotNotationKeyPaths.ts  
  - Purpose: Topaz object with dot-notation keys for path-based access tests.  
  - Use: validate mapping utilities and DataPicker path lookups.

- TestData_TopazApplicant_Empty.ts  
  - Purpose: minimal/empty Topaz applicant payload for negative or default tests.  
  - Use: assert handling of missing fields and defaulting logic.

- TestData_UkAddress_01.ts  
  - Purpose: UK address sample used across address-related fixtures.  
  - Use: reuse when building address rows or validating address handling.

- TOPAZ_PROC_A_USER.ts  
  - Purpose: procedural Topaz user fixture used in process flows.  
  - Use: seed user-based scenarios and end-to-end process tests.

## Quick usage

- Import a test object and merge into env fixtures:
  - TS: `import applicant from './TestData_TopazApplicant_01';`  
  - Use: `const payload = { ...applicant, ...otherDetails };` before sending or asserting.
