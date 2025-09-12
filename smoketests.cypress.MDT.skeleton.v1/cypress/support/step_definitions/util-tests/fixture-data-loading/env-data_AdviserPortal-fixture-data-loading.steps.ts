import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import CommonUtils from '../../../utils/common-utils';
import { ApplicantDetails, BuzzwordDetails, CycleYearDetails, EmailApplicantDetails, FeePaymentMethodDetails, GroupDetails, QualificationDetails, RefereeDetails, ReferenceTemplateTextDetails, StudentHubActivityDetails } from "cypress/support/utils/env/AdviserPortalData";
import { NonUKAddress, UkAddress } from "cypress/support/utils/env/Address";

let envData: EnvDataUtil;
let currentCycleYearDetails: CycleYearDetails;
let currentEmailApplicantDetails: EmailApplicantDetails[];
let currentApplicantDetailsData: ApplicantDetails[];
let currentGroupDetails: GroupDetails[];
let currentQualificationDetails: QualificationDetails[];
let currentAdditionalRefereeDetails: RefereeDetails[];
let currentFeePaymentMethodDetails: FeePaymentMethodDetails[];
let currentBuzzwordDetails: BuzzwordDetails;
let currentReferenceTemplateTextDetails: ReferenceTemplateTextDetails;
let currentAddressDetails: UkAddress[] | NonUKAddress[];
let currentEmailAddresses: string[];
let currentTelephoneNumbers: string[];
let currentDatesUnavailable: string[];
let currentStudentHubActivityDetails: StudentHubActivityDetails;
let convertedBooleanValue: boolean;
let convertedQualsCheckedFlag: boolean;
let convertedDeletedFlag: boolean;
let convertedPredictedGradesApplicableFlag: boolean;

Given('I have loaded the data for the env-data Adviser Portal fixture file', () => {
  envData = new EnvDataUtil();
});

When('I call the getCycleYearDetails method', () => {
  // Get the actual data
  const actualData = envData.adviserPortalData.getCycleYearDetails();
  currentCycleYearDetails = actualData;
});

When('I call the getAllApplicationsEmailApplicantDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsEmailApplicantDetails();
    currentEmailApplicantDetails = actualData;
});

When('I call the getAllApplicationsEmailTrackedApplicantDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsEmailTrackedApplicantDetails();
    currentEmailApplicantDetails = actualData;
});

When('I call the getAllApplicationsApplicantDetailsByAppStatus method with {string}', (appStatus: string) => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsApplicantDetailsByAppStatus(appStatus);
    currentApplicantDetailsData = actualData;
});

When('I call the getAllApplicationsApplicantDetailsData method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsApplicantDetailsData();
    currentApplicantDetailsData = actualData;
});

When('I call the getAllApplicationsApplicantDetailsExcludingDeleted method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsApplicantDetailsExcludingDeleted();
    currentApplicantDetailsData = actualData;
});

When('I call the getAllApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag method with AppStatus {string} and QualsChecked {string}', (appStatus: string, qualsChecked: string) => {
    //converting QualsChecked value from string to boolean
    convertedQualsCheckedFlag = convertStringToBoolean(qualsChecked);
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag(appStatus, convertedQualsCheckedFlag);
    currentApplicantDetailsData = actualData;
});

When('I call the getAllDeletedApplicationsApplicantDetailsByAppStatus method with {string}', (appStatus: string) => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllDeletedApplicationsApplicantDetailsByAppStatus(appStatus);
    currentApplicantDetailsData = actualData;
});

When('I call the getAllApplicationsApplicantDetailsByRefStatusExcludingDeletedSent method with {string}', (refStatus: string) => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsApplicantDetailsByRefStatusExcludingDeletedSent(refStatus);
    currentApplicantDetailsData = actualData;
});

When('I call the getAllApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent method with {string}', (refStatus: string) => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent(refStatus);
    currentApplicantDetailsData = actualData;
});

When('I call the getAllCentreManagementGroupDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementGroupDetails();
    currentGroupDetails = actualData;
});

When('I call the getAllCentreManagementQualificationDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementQualificationDetails();
    currentQualificationDetails = actualData;
});

When('I call the getAllCentreManagementAdditionalRefereeDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementAdditionalRefereeDetails();
    currentAdditionalRefereeDetails = actualData;
});

When('I call the getAllCentreManagementFeePaymentOptionDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementFeePaymentOptionDetails();
    currentFeePaymentMethodDetails = actualData;
});

When('I call the getAllCentreManagementBuzzwordDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementBuzzwordDetails();
    currentBuzzwordDetails = actualData;
});

When('I call the getAllCentreManagementReferenceTemplateTextDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementReferenceTemplateTextDetails();
    currentReferenceTemplateTextDetails = actualData;
});

When('I call the getAllCentreManagementCentreDetailsDataUpdatesUKAddresses method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementCentreDetailsDataUpdatesUKAddresses();
    currentAddressDetails = actualData;
});

When('I call the getAllCentreManagementCentreDetailsDataUpdatesNonUKAddresses method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementCentreDetailsDataUpdatesNonUKAddresses();
    currentAddressDetails = actualData;
});

When('I call the getAllCentreManagementCentreDetailsDataUpdatesEmailAddresses method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementCentreDetailsDataUpdatesEmailAddresses();
    currentEmailAddresses = actualData;
});

When('I call the getAllCentreManagementCentreDetailsDataUpdatesTelephoneNumbers method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementCentreDetailsDataUpdatesTelephoneNumbers();
    currentTelephoneNumbers = actualData;
});

When('I call the getAllCentreManagementCentreDetailsDataUpdatesDatesUnavailable method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllCentreManagementCentreDetailsDataUpdatesDatesUnavailable();
    currentDatesUnavailable = actualData;
});

When('I call the getAllStudentHubActivityDetails method', () => {
    // Get the actual data
    const actualData = envData.adviserPortalData.getAllStudentHubActivityDetails();
    currentStudentHubActivityDetails = actualData;
});

Then('the CycleYearDetails object should equal the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentCycleYearDetails, expectedValue)
});

Then('the EmailApplicantDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentEmailApplicantDetails[0], expectedValue)
});

Then('the ApplicantDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentApplicantDetailsData[0], expectedValue)
});

Then('the ApplicantDetails array should only include Applicants with an ApplicationStatus of {string}', (appStatus: string) => {
    //checking applicants have the correct app status
    currentApplicantDetailsData.forEach((applicantDetails) => {
        expect(applicantDetails.ApplicationStatus).to.equal(appStatus);
    });
});

Then('the ApplicantDetails array should only include Applicants with a Deleted flag of {string}', (deleted: string) => {
    //converting Deleted value from string to boolean
    convertedDeletedFlag = convertStringToBoolean(deleted);
    //checking applicants have not been deleted
    currentApplicantDetailsData.forEach((applicantDetails) => {
        expect(applicantDetails.Deleted).to.equal(convertedDeletedFlag);
    });
});

Then('the ApplicantDetails array should only include Applicants with a QualsChecked flag of {string}', (qualsChecked: string) => {
    //converting QualsChecked value from string to boolean
    convertedQualsCheckedFlag = convertStringToBoolean(qualsChecked);
    //checking applicants QualsChecked value
    currentApplicantDetailsData.forEach((applicantDetails) => {
        expect(applicantDetails.QualificationsChecked).to.equal(convertedQualsCheckedFlag);
    });
});

Then('the ApplicantDetails array should only include Applicants with a ReferenceStatus of {string}', (refStatus: string) => {
    //checking applicants have the correct app status
    currentApplicantDetailsData.forEach((applicantDetails) => {
        expect(applicantDetails.ApplicationStatus).to.equal(refStatus);
    });
});

Then('the ApplicantDetails array should only include Applicants with a PredictedGradesApplicable flag of {string}', (predictedGradesApplicable: string) => {
    //converting PredictedGradesApplicable value from string to boolean
    convertedPredictedGradesApplicableFlag = convertStringToBoolean(predictedGradesApplicable);
    //checking applicants PredictedGradesApplicable value
    currentApplicantDetailsData.forEach((applicantDetails) => {
        expect(applicantDetails.PredictedGradesApplicable).to.equal(convertedPredictedGradesApplicableFlag);
    });
});

Then('the ApplicantDetails array should only include Applicants without an ApplicationStatus of {string}', (appStatus: string) => {
    //checking applicants have the correct app status
    currentApplicantDetailsData.forEach((applicantDetails) => {
        expect(applicantDetails.ApplicationStatus).to.not.equal(appStatus);
    });
});

Then('the GroupDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentGroupDetails[0], expectedValue)
});

Then('the QualificationDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentQualificationDetails[0], expectedValue)
});

Then('the AdditionalRefereeDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentAdditionalRefereeDetails[0], expectedValue)
});

Then('the FeePaymentMethodDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentFeePaymentMethodDetails[0], expectedValue)
});

Then('the BuzzwordDetails object should equal the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentBuzzwordDetails, expectedValue)
});

Then('the ReferenceTemplateTextDetails object should equal the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentReferenceTemplateTextDetails, expectedValue)
});

Then('the AddressDetails array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentAddressDetails[0], expectedValue)
});

Then('the EmailAddresses array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentEmailAddresses[0], expectedValue)
});

Then('the TelephoneNumbers array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentTelephoneNumbers[0], expectedValue)
});

Then('the DatesUnavailable array should have the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentDatesUnavailable[0], expectedValue)
});

Then('the StudentHubActivityDetails object should equal the object {string}', (expectedValue: string) => {
    IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentStudentHubActivityDetails, expectedValue)
});

function convertStringToBoolean(stringToConvert: string) {
    //conversion of string to boolean
    convertedBooleanValue = stringToConvert === 'true'
    return convertedBooleanValue
};

function IsCurrentDetailsObjectEqualToExpectedDetailsObject(currentDetails: any, expectedValue: string) {
    cy.log(`expectedValue: ${expectedValue}`);
  
    // Use the parseJSON method to convert the string into an object
    const expectedValue_parsedJSONObject = CommonUtils.parseJSON(expectedValue);
  
    // Perform the comparison
    expect(currentDetails).to.deep.equal(expectedValue_parsedJSONObject);
};