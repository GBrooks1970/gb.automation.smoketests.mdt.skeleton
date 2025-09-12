Feature: env-data Adviser Portal Fixture Data Loading Test

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-001 - Loading Adviser Portal data from the fixture file using getCycleYearDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getCycleYearDetails method
    Then the CycleYearDetails object should equal the object '{\"CurrentCycleYear\":\"2024\",\"MaxSupportedCycleYear\":\"2025\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-002 - Loading Adviser Portal data from the fixture file using getAllApplicationsEmailApplicantDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsEmailApplicantDetails method
    Then the EmailApplicantDetails array should have the object '{\"AdviserName\":\"Automation Adviser One\",\"Subject\":\"Application Deadline Approaching\",\"Message\":\"I hope you\'re doing well. This is a reminder that the deadline for your university application is approaching soon. Make sure the application has been submitted by the 01 June 2024.\n\nIf you have any questions or need assistance, please don\'t hesitate to contact me.\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-003 - Loading Adviser Portal data from the fixture file using getAllApplicationsEmailTrackedApplicantDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsEmailTrackedApplicantDetails method
    Then the EmailApplicantDetails array should have the object '{\"AdviserName\":\"Automation Adviser One\",\"Subject\":\"Important: Next Steps for Your University Offers\",\"Message\":\"Congratulations on receiving offers from UK universities! This is an exciting time, and Im here to support you in making the best choice for your studies. Please review your offers carefully and reach out if you have any questions or need guidance on the next steps.\n\nEach offer has its own response deadline, so I encourage you to act promptly to secure your place. Let me know if you\'d like to discuss your options or if there is anything I can assist with.\n\nBest regards,\nUK Adviser One\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-004 - Loading Adviser Portal data from the fixture file using getAllApplicationsApplicantDetailsByAppStatus
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsApplicantDetailsData method
    Then the ApplicantDetails array should have the object '{\"PID\":\"1200006560\",\"FirstName\":\"Lee\",\"LastName\":\"Izaan\",\"CycleYear\":\"[Max Supported Cycle]\",\"ApplicationStatus\":\"In progress\",\"QualificationsChecked\":true,\"Deleted\":false,\"AdviserNotes\":\"This is a Test note\",\"ReferenceStatus\":\"In progress\",\"ReferenceDetails\":{\"RefereeName\":\"Automation Referee Tester\",\"ReferenceGeneralStatement\":\"Our school is committed to fostering academic excellence and holistic development among our students. We provide a dynamic learning environment that encourages critical thinking, creativity, and collaboration. Our dedicated faculty and staff work closely with students to ensure they reach their full potential and achieve their educational goals.\",\"ReferenceExtenuatingCircumstances\":\"The applicant has demonstrated exceptional resilience and determination despite facing challenging personal circumstances during their academic journey. These challenges included significant health issues in their family, which required the applicant to take on additional responsibilities at home. Despite these challenges, the applicant has consistently maintained strong academic performance and actively contributed to extracurricular activities.\",\"ReferenceOther\":\"The applicant has a keen interest in environmental science, which is evident from their active involvement in our school\'s sustainability club. They have led several initiatives to promote environmental awareness within the school community. Additionally, the applicant completed an internship at a local environmental organization, gaining hands-on experience in the field. Their passion and practical experience make them an excellent candidate for programs related to environmental studies or biology.\",\"ReferenceDatesUnavailable\":\"[BLANK]\"},\"PredictedGradesApplicable\":false,\"PredictedGrade\":\"[IGNORE]\",\"DataUpdates\":{\"RefereeName\":\"BDD Automation Referee\",\"ReferenceGeneralStatement\":\"At BDD Automation UI Tests, we are dedicated to cultivating a culture of lifelong learning and personal growth. We strive to empower our students with the knowledge, skills, and values essential for success in an ever-changing world. Our innovative curriculum emphasizes not only academic rigor but also the development of resilience, empathy, and global citizenship. Through engaging experiences both inside and outside the classroom, we inspire curiosity, foster leadership, and nurture a strong sense of community among our students and faculty.\",\"ReferenceExtenuatingCircumstances\":\"During their time at our institution, the applicant faced considerable adversity due to economic hardship within their family. Despite these financial challenges, the applicant exhibited unwavering dedication to their studies and extracurricular commitments. Their resilience was especially evident when they took on part-time work to support themselves and contribute to family expenses. Throughout these difficulties, the applicant demonstrated remarkable perseverance, maintaining excellent academic standing and actively engaging in community service initiatives. Their ability to thrive amidst adversity underscores their exceptional character and determination.\",\"ReferenceOther\":\"The applicant has consistently demonstrated a strong passion for technology and innovation throughout their academic journey. Their enthusiasm for computer science is evidenced by their active participation in coding competitions and tech-focused clubs. Notably, the applicant spearheaded a school project that involved developing a mobile application to address a local community need, showcasing both their technical skills and problem-solving abilities.\n\nMoreover, the applicant pursued internships with leading tech companies during summer breaks, gaining invaluable hands-on experience in software development and project management. Their exceptional performance and innovative mindset during these internships underscore their readiness for advanced studies and professional growth in the field of computer science or software engineering.\",\"ReferenceDatesUnavailable\":\"2024-08-20\",\"AdviserNotes\":\"This is my Adviser notes update\",\"PredictedGrade\":\"[IGNORE]\"}}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-005 - Loading specfic Adviser Portal data from the fixture file using getAllApplicationsApplicantDetailsByAppStatus
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsApplicantDetailsByAppStatus method with "Awaiting approval"
    Then the ApplicantDetails array should only include Applicants with an ApplicationStatus of "Awaiting approval"

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-006 - Loading specfic Adviser Portal data from the fixture file using getAllApplicationsApplicantDetailsExcludingDeleted
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsApplicantDetailsExcludingDeleted method
    Then the ApplicantDetails array should only include Applicants with a Deleted flag of "false"

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-007 - Loading specfic Adviser Portal data from the fixture file using getAllApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag method with AppStatus "In progress" and QualsChecked "true"
    Then the ApplicantDetails array should only include Applicants with an ApplicationStatus of "In progress"
    And the ApplicantDetails array should only include Applicants with a QualsChecked flag of "true"

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-008 - Loading specfic Adviser Portal data from the fixture file using getAllDeletedApplicationsApplicantDetailsByAppStatus
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllDeletedApplicationsApplicantDetailsByAppStatus method with "In progress" 
    Then the ApplicantDetails array should only include Applicants with an ApplicationStatus of "In progress"
    And the ApplicantDetails array should only include Applicants with a Deleted flag of "true"

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-009 - Loading specfic Adviser Portal data from the fixture file using getAllApplicationsApplicantDetailsByRefStatusExcludingDeletedSent
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsApplicantDetailsByRefStatusExcludingDeletedSent method with "In progress" 
    Then the ApplicantDetails array should only include Applicants with a ReferenceStatus of "In progress"
    And the ApplicantDetails array should only include Applicants with a Deleted flag of "false"

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-010 - Loading specfic Adviser Portal data from the fixture file using getAllApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent method with "In progress" 
    Then the ApplicantDetails array should only include Applicants with a ReferenceStatus of "In progress"
    And the ApplicantDetails array should only include Applicants with a PredictedGradesApplicable flag of "true"
    And the ApplicantDetails array should only include Applicants with a Deleted flag of "false"
    And the ApplicantDetails array should only include Applicants without an ApplicationStatus of "Sent"

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-011 - Loading Adviser Portal data from the fixture file using getAllCentreManagementGroupDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementGroupDetails method
    Then the GroupDetails array should have the object '{\"GroupName\":\"Test Group One\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-012 - Loading Adviser Portal data from the fixture file using getAllCentreManagementQualificationDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementQualificationDetails method
    Then the QualificationDetails array should have the object '{\"QualGroup\":\"Graded music, dance, drama\",\"QualName\":\"GCE Advanced Level\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-013 - Loading Adviser Portal data from the fixture file using getAllCentreManagementAdditionalRefereeDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementAdditionalRefereeDetails method
    Then the AdditionalRefereeDetails array should have the object '{\"RefereeName\":\"Test Referee One\",\"Occupation\":\"Tester One\",\"Email\":\"Test@RefereeOne.com\",\"Phone\":\"07728741154\",\"CentreName\":\"Automated BDD UI Tests\",\"Address\":{\"AddressLines\":[\"1 Cheltenham Street\",\"Line 2\",\"Line 3\"],\"PostCode\":\"GL55 6TT\"}}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-014 - Loading Adviser Portal data from the fixture file using getAllCentreManagementFeePaymentOptionDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementFeePaymentOptionDetails method
    Then the FeePaymentMethodDetails array should have the object '{\"FeePaymentMethodName\":\"Invoice\",\"Description\":\"UCAS will send your centre an invoice (applicants should not send payments directly to UCAS)\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-015 - Loading Adviser Portal data from the fixture file using getAllCentreManagementBuzzwordDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementBuzzwordDetails method
    Then the BuzzwordDetails object should equal the object '{\"Buzzword\":\"AutomatedBDDUI2025\",\"DataUpdates\":{\"Buzzword\":\"AutomatedBDDUI2025Updated\"}}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-016 - Loading Adviser Portal data from the fixture file using getAllCentreManagementReferenceTemplateTextDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementReferenceTemplateTextDetails method
    Then the ReferenceTemplateTextDetails object should equal the object '{\"ReferenceTemplateText\":\"Reference Template Text\",\"DataUpdates\":{\"ReferenceTemplateText\":\"Updated Reference Template Text\"}}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-017 - Loading Adviser Portal data from the fixture file using getAllCentreManagementCentreDetailsDataUpdatesUKAddresses
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementCentreDetailsDataUpdatesUKAddresses method
    Then the AddressDetails array should have the object '{\"AddressLines\":[\"25 Oak Lane\",\"Hillside\",\"Bristol\",\"Avon\"],\"PostCode\":\"BS4 3AB\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-018 - Loading Adviser Portal data from the fixture file using getAllCentreManagementCentreDetailsDataUpdatesNonUKAddresses
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementCentreDetailsDataUpdatesNonUKAddresses method
    Then the AddressDetails array should have the object '{\"AddressLines\":[\"123 Main Street\",\"Apt 456\",\"Anytown\",\"Province\"],\"Country\":\"United States of America\"}'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-019 - Loading Adviser Portal data from the fixture file using getAllCentreManagementCentreDetailsDataUpdatesEmailAddresses
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementCentreDetailsDataUpdatesEmailAddresses method
    Then the EmailAddresses array should have the object '\"automation@test.com\"'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-020 - Loading Adviser Portal data from the fixture file using getAllCentreManagementCentreDetailsDataUpdatesTelephoneNumbers
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementCentreDetailsDataUpdatesTelephoneNumbers method
    Then the TelephoneNumbers array should have the object '\"01244 554771\"'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-021 - Loading Adviser Portal data from the fixture file using getAllCentreManagementCentreDetailsDataUpdatesDatesUnavailable
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllCentreManagementCentreDetailsDataUpdatesDatesUnavailable method
    Then the DatesUnavailable array should have the object '\"2024-06-22\"'

Scenario: ADVISER-PORTAL-DATA-LOADING-TEST-022 - Loading Adviser Portal data from the fixture file using getAllStudentHubActivityDetails
    Given I have loaded the data for the env-data Adviser Portal fixture file
    When I call the getAllStudentHubActivityDetails method
    Then the StudentHubActivityDetails object should equal the object '{\"FirstName\":\"Jossiah\",\"LastName\":\"Khang\",\"IntendedYearOfApplication\":\"2025\",\"OtherSchemes\":[\"Apprenticeships\"],\"Subjects\":[\"Accounting and finance\"],\"LastLogin\":\"22 May 2024 07:44\"}'