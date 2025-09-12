import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { DataMapper } from "cypress/support/utils/DataMapper";

/**
 * Stores the generated empty object for verification.
 */
let generatedEmptyObject: Record<string, any>;
let interfaceNameChosen: any;

/**
 * Given step to initialize the test with an interface structure.
 */
Given("I have a {string} structure", (interfaceName: string) => {
    const interfaceTemplates: Record<string, any> = {
        TopazApplicant: {
            PID: "",
            Scheme: "",
            Profile: {},
            PostCode: "",
            FeePaidStatus: "",
            FeeType: "",
            FeePaid: "",
            TotalFee: "",
            PaymentAmount: "",
            RefundAmount: "",
            QualificationsReceived: [],
            QualificationsAwaiting: [],
            PersonalStatement: "",
            ReferenceDetails: {},
            ApplicantOtherDetails: {},
            MoreAboutYouAndExtraActivities: {},
            DataUpdates: {},
        },
        TopazApplicantProfile: {
            Forenames: "",
            Initials: "",
            Surname: "",
            Email: "",
            Gender: "",
            DateOfBirth: "",
            HomeNumber: "",
            MobileNumber: "",
        },
        TopazQualification: {
            Month: "",
            Year: "",
            Body: "",
            Subject: "",
            Level: "",
            Predicted: "",
            Result: "",
            CentreNo: "",
            CentreName: "",
            CandNo: "",
        },
        TopazReferenceDetails: {
            RefereeName: "",
            Post: "",
            Telephone: "",
            Fax: "",
            Email: "",
            Organisation: "",
            Address: {},
            ReferenceText: "",
        },
        MoreAboutYouAndExtraActivities: {
            MoreAboutYouDetails: {},
            ExtraActivityDetails: [],
        },
        TopazApplicantOtherDetails: {
            OtherPersonalDetails: {},
            OtherMisc01Details: {},
            OtherMisc02Details: {},
            OtherEducationDetails: {},
            EmergencyContact: {},
            CatchQuestions: {},
            PassportDetails: {},
            DetailsOfPaidEmployment: [],
            Languages: [],
            PreviousNursingMidwiferyEducation: [],
        },
        TopazEmergencyContact: {
            ContactName: "",
            PhoneNumber: "",
        },
        TopazPassportDetails: {
            StudentVisaRequired: "",
            PassportNumber: "",
            PassportPlaceOfIssue: "",
            PreviouslyStudiedInUkOnStudentVisa: "",
            PassportIssueDate: "",
            PassportExpiryDate: "",
            SettledInUK: "",
        },
        TopazOtherEducationDetails: {
            SchoolCollegeAndUniversityEducation: {},
            AdditionalEducation: {},
            ActivitiesInPreparationForHigherEducation: [],
            FirstDegreeOrEquivalent: {},
            ContentOfFirstDegreeOrEquivalent: [],
            OtherRelevantQualifications: [],
            AdditionalUCASTeacherTrainingInformation: {},
        },
    };
    interfaceNameChosen = interfaceTemplates[interfaceName];
    
    expect(interfaceTemplates).to.have.property(interfaceName);
});

/**
 * When step to call generateEmptyObject with the selected interface.
 */
When("I call generateEmptyObject with the interface", function () {
    generatedEmptyObject = DataMapper.generateEmptyObject(interfaceNameChosen);
    
    cy.log(`generatedEmptyObject: ${JSON.stringify(generatedEmptyObject)}`);
});

/**
 * Then step to verify all properties are set to empty strings.
 */
Then("the result should be an object with all properties set to \"\"", () => {
    Object.values(generatedEmptyObject).forEach((value) => {
        if (Array.isArray(value)) {
            expect(value).to.deep.equal([]);
        } else if (typeof value === "object" && value !== null) {
            expect(value).to.deep.equal({});
        } else {
            expect(value).to.equal("");
        }
    });
});

