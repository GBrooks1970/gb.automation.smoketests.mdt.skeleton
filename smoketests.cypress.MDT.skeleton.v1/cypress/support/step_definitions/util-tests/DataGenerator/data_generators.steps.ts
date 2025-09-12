import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

// Import all data generators
import {
    generateRandomBaseAddress,
    generateRandomUkAddress,
    generateRandomBFPOAddress,
    generateRandomUkAddressWithCountry,
} from "cypress/support/utils/TestDataObjects/DataGenerator/DataGenerator_Address";

import {
    generateRandomTopazApplicantProfile,
    generateRandomTopazQualification,
    generateRandomTopazReferenceDetails,
    generateRandomTopazApplicant,
    generateMoreAboutYouAndExtraActivities,
} from "cypress/support/utils/TestDataObjects/DataGenerator/DataGenerator_TopazApplicant";
import { 
    generateRandomTopazApplicantOtherDetails 
} from "cypress/support/utils/TestDataObjects/DataGenerator/DataGenerator_TopazApplicantOtherDetails";

/**
 * A mapping of generator functions to their corresponding interface names.
 * Used to dynamically call the appropriate generator during tests.
 * 
 * () => unknown:
 *       Represents a function that takes no arguments and returns a value of an unknown type.
 *       Used to handle multiple generators that return different types of objects dynamically.
 *      
 *       Enables dynamic invocation of generators in tests, 
 *          ensuring that all returned objects are validated against their expected structures.
 */
const generators: Record<string, () => unknown> = {
    generateRandomBaseAddress,
    generateRandomUkAddress,
    generateRandomBFPOAddress,
    generateRandomUkAddressWithCountry,
    generateRandomTopazApplicantProfile,
    generateRandomTopazQualification,
    generateRandomTopazReferenceDetails,
    generateRandomTopazApplicantOtherDetails,
    generateRandomTopazApplicant,
    generateMoreAboutYouAndExtraActivities,
};

/**
 * Recursively validates that the structure of an object matches the expected structure.
 * @param {any} object - The object to validate.
 * @param {Record<string, any>} structure - The expected structure, with properties and types.
 * @throws Will throw an error if the object's structure does not match the expected structure.
 */
function validateStructure(object: any, structure: any): void {
    for (const key in structure) {
        expect(object).to.have.property(key);
        const expectedValue = structure[key];
        const actualValue = object[key];

        if (Array.isArray(expectedValue)) {
            expect(actualValue).to.be.an("array");
        } else if (typeof expectedValue === "object" && expectedValue !== null) {
            expect(actualValue).to.be.an("object");
            validateStructure(actualValue, expectedValue); // Recursive validation
        } else {
            expect(typeof actualValue).to.equal(typeof expectedValue);
        }
    }
}

/**
 * A mapping of interfaces to their expected structures.
 * Each structure defines the properties and types expected in the generated object.
 */
const expectedStructures: Record<string, Record<string, any>> = {
    BaseAddress: { AddressLines: [] },
    UkAddress: { AddressLines: [], PostCode: "" },
    BFPOAddress: { AddressLines: [], BFPONumber: "" },
    UkAddressWithCountry: { AddressLines: [], PostCode: "", Country: "" },
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
        Address: { AddressLines: [], PostCode: "" },
        ReferenceText: "",
    },
    TopazApplicantOtherDetails: {
        OtherPersonalDetails: {
            HomeAddress: { AddressLines: [], PostCode: "", Country: "" },
            SecondEmail: "",
            ParentalOccupation: "",
            PrefferredFirstName: "",
            PreviousSurname: "",
            ResidentialStatus: "",
            AreaOfPermanentResidence: "",
            CountryOfBirth: "",
            Nationality: "",
            DualNationality: "",
            LivedOrWorkedEU: "",
            ParentEUNational: "",
            DateOfUKEntry: "",
            OutputLanguage: "",
            LargeFontRequired: "",
            NationalId1: "",
            NationalId2: "",
        },
        OtherMisc01Details: {},
        OtherMisc02Details: {},
        OtherEducationDetails: {},
        EmergencyContact: { ContactName: "", PhoneNumber: "" },
        CatchQuestions: { NationalInsuranceNumber: "", CATCHQuestionsAsked: "", NMCPIN: "" },
        PassportDetails: {
            StudentVisaRequired: "",
            PassportNumber: "",
            PassportPlaceOfIssue: "",
            PreviouslyStudiedInUkOnStudentVisa: "",
            PassportIssueDate: "",
            PassportExpiryDate: "",
            SettledInUK: "",
        },
        DetailsOfPaidEmployment: [],
        Languages: [],
        PreviousNursingMidwiferyEducation: [],
    },
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
    MoreAboutYouAndExtraActivities: {
        MoreAboutYouDetails: {
            Disability: "",
            DisabilityFurtherDetails: "",
            OfficialRefugeeStatus: "",
            FreeSchoolMeals: "",
            EstrangedFromParents: "",
            ParentingResponsibilities: "",
            CaringResponsibilities: "",
            ParentInArmedForces: "",
            UKArmedForces: "",
        },
        ExtraActivityDetails: [],
    },
};

let generatedObject: unknown;
let expectedStructure: Record<string, any>;
/**
 * Step: Generate data using the specified generator.
 * Dynamically calls the generator function from the `generators` map.
 * @param {string} generatorName - The name of the generator function.
 */
Given("I generate data using the {string}", (generatorName: string) => {
    const generator = generators[generatorName];
    expect(generator).to.exist;
    generatedObject = generator();
});
/**
 * Step: Validate the generated object against the expected structure.
 * Compares the structure of the generated object to the predefined structure in `expectedStructures`.
 * @param {string} interfaceName - The name of the interface to validate against.
 */
Then("the generated object should match the structure of {string}", (interfaceName: string) => {
    expectedStructure = expectedStructures[interfaceName];
    expect(expectedStructure).to.exist;
    validateStructure(generatedObject, expectedStructure);
});
