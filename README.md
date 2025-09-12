# README #

## What is this repository for? ##

The Skeleton MDT project serves as a centralised, reusable framework containing core code and utilities essential for the automation of BDD/Gherkin test cases in Cypress.  It is designed to streamline the development process across different MDT automation projects by providing a consistent structure, pre-built utilities, and best practices.

### Guidance ###

* A User Story’s behaviour, together with its Scenarios are simply its acceptance criteria: if the system fulfils all the acceptance criteria, it’s behaving correctly.
  * Testable story (it should be the smallest unit that fits in an iteration). Brief, simple, easy to understand, and free of technical jargon.
  * Feature title should describe an activity and is usually initially captured in a short one sentence description.
  * Narrative should include a role, a feature, and a benefit.
  * Feature should be described in terms of some terse yet descriptive text of what is desired, expressed using the As a ... I want to ... So that I can ... notation.
  * **As a** [type of user],
  * **I want to** [perform some task],
  * **So that I can** [achieve some goal].
  * Feature is then further broken down to individual scenarios that would form acceptance criteria.
  * Scenario titles should say what's different and describe an activity.
  * Scenario should be described in terms of Givens, Events, and Outcomes, expressed using the Given ... When ... Then ... notation.
  * **Givens** should define all of, and no more than, the required context.
  * **When** or the action should describe the event of the featured behaviour.
  * **Then** or the outcome should describe the expected observable behaviour that is required.
  * Sentence case to be used BUT the entity/main activity/major words should be in Title Case.

### Folder Structure , Feature file and Test Case naming and tagging strategy ###

* Each area to have it own unique tag
* Each feature to have it's own feature file with a unique file name
* Test cases , related to a feature, to be contained with it's area feature file
* Each test case to have it's unique tag name
* Explanation with examples

Area Description     | Area unique tag  | Folder name | Feature file naming    | Test Case(s) tag naming
------------------------------- | ----------------- | ------------- | ----------------------------- | ----------------------------
short area description   | [Area-tag]   | [Area-tag]  | [Area-tag]-[aphabetical]   | [Area-tag]-[feature-aplha]-[XXX] where XXX is numeric
UG-APPLY-PD - Personal Details | ug-apply-pd   | ug-apply-pd  | ug-apply-pd-a     | ug-apply-pd-a-001, ug-apply-pd-a-002 etc.

         |       |      | ug-apply-pd-b     | ug-apply-pd-b-001, ug-apply-pd-b-002 etc.
UG-APPLY-CD - Contact Details | ug-apply-cd   | ug-apply-cd  | ug-apply-cd-a      | ug-apply-cd-a-001, ug-apply-cd-a-002 etc.
        |      |      | ug-apply-cd-b     | ug-apply-cd-b-001, ug-apply-cd-b-002 etc.

* Example folder structure

Folder Structure      | Folder description
----------------------------------- | -----------------------------------------------------------------------------
ucas.automation.smoketests.employer     |
│   README.md                           |
│                                       |
└───000 - Misc      | Miscellaneous files - considered useful for this project
│       misc files                      |
│       ...       |
└───UG-APPLY      | Project overview
│   │   README.md     |
│   │        |
│   └───UG-APPLY-CD     | Project area
│   │      README.md    |
│   │      ug-apply-cd-a.feature | feature file contaning test cases for that feature area
│   │      ug-apply-cd-b.feature |
│   │      ...      | (other feature files)
│   └───UG-APPLY-PD     | Project area
│          README.md    |
│          ug-apply-pd-a.feature | feature file contaning test cases for that feature area
│          ug-apply-pd-b.feature |
│          ...      | (other feature files)

### Review Process and branch strategy ###

Branch        | Process
------------------------------- | -------------------------------
Dev        | Work In Progress branch
Reviewed_TAA      | PR's raised from Dev branch to be reviewed and approved by TAA
Reviewed_MDT      | PR's raised from Reviewed_TAA branch to be reviewed and approved by MDT team members
Master        | PR's raised from Reviewed_MDT branch to finalize the process

### Feature Review Guidelines ###

MoSCoQ (adaption of MoSCoW)  | Explanation
------------------------------- | -------------------------------
MUST       | This must be fixed before a review can be approved and merged
SHOULD       | This should be fixed before merging, or a task should be raised to address the comments at a later date.
COULD       | This will be commonly related to aesthetics and/or suggested improvements. This does not necessarily need to be addressed before a review can be approved and merged.
QUERY       | This is a request from the reviewer for more information, or clarification. Depending on the answer, there is potential this could be changed to MUST, SHOULD or COULD
COMMENT       | Reviewer comments to highlight any useful information. These are optional and do not need to be addressed before a review can be approved and merged.

### Conventions and representations Used ###

Symbol Guidlines                 | Examples
------------------------------------------------------------------------------- | -------------------------------
Use of one word                 | CAPITALS
More than one word use Pascal Case             | FirstName and LastName
Two part token, separate the differentiator aplha/numeric       | CharSet XXX
Avoid Kebab Case or Snake case, as can cause some issues when trying to parse | kebab-case or snake_case

Symbol        | Explanation
------------------------------- | -------------------------------
[VALID]        | Enter or Select any valid data for field
[TODAY]        | Current system date
[TOMORROW]       | Tomorrow's  system date
[YESTERDAY]       | Yesterday's system date
[+2 Years 1 month, 1 day]    | Indicates a computed date based on the current system date. This can include one or more of Years, Months and Days. E.g. *[+2 Years 1 month -1 day]* would be computed as the date that is 2 years and 1 month in the future minus one day; for example if the current system date is 20/02/2023 then the date would be 19/03/2025
[Non XX] or [Not XX]     | Any valid input expect the one specified. For example *[Non UK]* means any country except UK
[CharSet XXX]       | Indicates the input to be restricted to a given character set. CharSet can be Alpha, Numeric, Punctuation, Special or Unicode.  

        | The sets should be disjoint so if a punctuation character is a special character it should only appear in the Special character set. 
        | The number at the end indicate the number of such characters to be selected randomly from the set of characters. 
        | The Character sets could be joined together such as [Alpha Numeric Special]  which would represent the set of all Alpha, Numeric and Special Characters 
        | (characters that are not Alpha or Numeric).
        |  XX valid characters for data field e.g. [Alpha 100]
[UPDATEVALID]            | Indicates an update to valid data for data field
[UPDATENONVALID]           | Indicates an update to NON valid data for data field
[NoChange]      | Indicates that no update to data is made for data field
[AddOptionalData]      | Indicates an assertion for valid data for data field - Addition of valid data to all Optional Data fields
[RemoveOptionalData]    | Indicates an assertion for valid data for data field - Removal of all data in all Optional Data fields
[UpdatedValidOptionalData]   | Indicates an update to valid data for data field - Add valid data to all Optional Data fields
[UpdatedRemoveOptionalData]  | Indicates an update to valid data for data field - Remove all data in all Optional Data fields
[BLANK]                         | Indicates the field should be blank/empty entry
[UPDATEBLANK]                   | Indicates an update from some value to a blank/empty entry
[IGNORE]                        | Indicates the field should be ignored from data entry. Used for fields that are dependant upon values in other fields and no data
         entry is required.
[OnyxUserId]                   | The Onyx User Id used for testing
[OnyxManagerUserId]           | The Onyx Manager User Id used for testing
[OnyxDefaultPassword]          | The default Password for Onyx test users
[QualManagerUserId]           | The Qualifications Manager User Id used for testing
[QualManagerPassword]          | The default Password for Qualifications Manager test users
[TopazUserId]             | The Topaz User Id used for testing
[TopazPassword]            | The default Password for Topaz test users
