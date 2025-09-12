# env (cypress/support/utils/env)

Utilities and test data builders for environment-specific fixtures used in Cypress smoke tests (Apply, Employer, Topaz, User, etc.).

## Files

- ApplyData.ts  
  - Purpose: apply-flow fixture shapes and builders.  
  - Use: import to construct application test payloads.

- EmployerData.ts  
  - Purpose: employer-related fixture builder and defaults.  
  - Use: generate employer test records and payloads.

- EnvDataUtil.ts  
  - Purpose: core environment data utility (loader/manager).  
  - Use: central entry for reading/combining env fixtures.

- EnvDataUtil_AdviserPortalData.ts  
  - Purpose: adviser-portal specific env helpers.  
  - Use: prepare adviser portal fixtures and overrides.

- EnvDataUtil_ApplyData.ts  
  - Purpose: wrappers for ApplyData integration with EnvDataUtil.  
  - Use: load/merge apply fixtures per environment.

- EnvDataUtil_Base.ts  
  - Purpose: shared base utilities and types for EnvDataUtil modules.  
  - Use: import for type safety and shared helpers.

- EnvDataUtil_EmployerData.ts  
  - Purpose: wrappers for EmployerData integration with EnvDataUtil.  
  - Use: load/merge employer fixtures per environment.

- EnvDataUtil_TopazData.ts  
  - Purpose: Topaz-specific env utilities and loaders.  
  - Use: prepare Topaz fixtures for tests.

- EnvDataUtil_UserData.ts  
  - Purpose: user-data helpers integrated with EnvDataUtil.  
  - Use: load user profiles and test user fixtures.

- EnvironmentData.ts  
  - Purpose: typed environment data container and accessors.  
  - Use: import to read combined env dataset in tests.

- TopazData.ts  
  - Purpose: Topaz domain data builders and defaults.  
  - Use: create Topaz-specific test objects.

- TopazData_Flattened.ts  
  - Purpose: flattened view of TopazData for easy assertions.  
  - Use: use in comparisons or when flat payloads are required.

- TopazData_TopazApplicant.ts  
  - Purpose: applicant-specific Topaz builders.  
  - Use: generate applicant payloads for Topaz flows.

- TopazData_TopazApplicantOtherDetails.ts  
  - Purpose: supplemental applicant details for Topaz.  
  - Use: extend applicant fixtures with additional fields.

- TopazData_TopazOtherEducationDetails.ts  
  - Purpose: education-related details for Topaz applicants.  
  - Use: attach education info to applicant fixtures.

- UserData.ts  
  - Purpose: generic user fixture builders and defaults.  
  - Use: create test users and common user payloads.

- UserInfoData.ts  
  - Purpose: user information/detail helpers (profile fields).  
  - Use: detailed user info for assertions or payloads.

- README.md  
  - This file: index and quick usage notes.

## Quick usage

- Import specific builders:
  - TS: `import ApplyData from './env/ApplyData';`  
  - Use EnvDataUtil to load environment-combined fixtures: `EnvDataUtil.load('dev')`.
