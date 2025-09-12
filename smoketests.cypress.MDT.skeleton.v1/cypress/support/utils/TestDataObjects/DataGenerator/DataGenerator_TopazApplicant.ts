
import { faker } from "@faker-js/faker";
import { generateRandomUkAddress } from "cypress/support/utils/TestDataObjects/DataGenerator/DataGenerator_Address";
import { generateRandomTopazApplicantOtherDetails } from "./DataGenerator_TopazApplicantOtherDetails";
import { TopazApplicantProfile, TopazQualification, TopazReferenceDetails, MoreAboutYouAndExtraActivities, TopazApplicant } from "../../env/TopazData_TopazApplicant";


export const generateRandomTopazApplicantProfile = (empty: boolean = false): TopazApplicantProfile => ({
    Forenames: empty ? "" : empty ? "" : faker.person.firstName(),
    Initials: empty ? "" : empty ? "" : faker.person.firstName().charAt(0),
    Surname: empty ? "" : empty ? "" : faker.person.lastName(),
    Email: empty ? "" : empty ? "" : faker.internet.email(),
    Gender: empty ? "" : empty ? "" : faker.person.sexType(),
    DateOfBirth: empty ? "" : empty ? "" : faker.date.birthdate({ min: 18, max: 65, mode: "age" }).toISOString().split("T")[0],
    HomeNumber: empty ? "" : empty ? "" : faker.phone.number(),
    MobileNumber: empty ? "" : empty ? "" : faker.phone.number(),
});
export const generateRandomTopazQualification = (empty: boolean = false): TopazQualification => ({
    Month: empty ? "" : faker.date.month(),
    Year: empty ? "" : faker.date.past({ years: 10 }).getFullYear().toString(),
    Body: empty ? "" : faker.company.name(),
    Subject: empty ? "" : faker.lorem.word(),
    Level: empty ? "" : faker.helpers.arrayElement(["A", "B", "C"]),
    Predicted: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    Result: empty ? "" : faker.helpers.arrayElement(["Pass", "Merit", "Distinction"]),
    CentreNo: empty ? "" : faker.string.alphanumeric(5),
    CentreName: empty ? "" : faker.company.name(),
    CandNo: empty ? "" : faker.string.alphanumeric(6),
});
export const generateRandomTopazReferenceDetails = (empty: boolean = false): TopazReferenceDetails => ({
    RefereeName: empty ? "" : faker.person.fullName(),
    Post: empty ? "" : faker.person.jobTitle(),
    Telephone: empty ? "" : faker.phone.number(),
    Fax: empty ? "" : faker.phone.number(),
    Email: empty ? "" : faker.internet.email(),
    Organisation: empty ? "" : faker.company.name(),
    Address: generateRandomUkAddress(),
    ReferenceText: empty ? "" : faker.lorem.paragraph(),
});
export const generateMoreAboutYouAndExtraActivities = (empty: boolean = false): MoreAboutYouAndExtraActivities => ({
    MoreAboutYouDetails: {
        Disability: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        DisabilityFurtherDetails: empty ? "" : faker.lorem.sentence(),
        OfficialRefugeeStatus: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        FreeSchoolMeals: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        EstrangedFromParents: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        ParentingResponsibilities: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        CaringResponsibilities: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        ParentInArmedForces: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
        UKArmedForces: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    },
    ExtraActivityDetails: Array.from({ length: 3 }, () => ({
        TypeOfActivity: empty ? "" : faker.lorem.words(2),
        NameOfActivity: empty ? "" : faker.lorem.words(3),
        ActivityProvider: empty ? "" : faker.company.name(),
        StartDate: empty ? "" : faker.date.past({ years: 5 }).toISOString().split("T")[0],
        EndDate: empty ? "" : faker.date.recent({ days: 5 }).toISOString().split("T")[0],
    })),
});

// TopazApplicant Generator with optional empty values
export const generateRandomTopazApplicant = (empty: boolean = false): TopazApplicant => ({
    PID: empty ? "" : faker.string.uuid(),
    Scheme: empty ? "" : faker.helpers.arrayElement(["Undergraduate", "Postgraduate", "PhD"]),
    Profile: generateRandomTopazApplicantProfile(empty),
    PostCode: empty ? "" : faker.location.zipCode(),
    FeePaidStatus: empty ? "" : faker.helpers.arrayElement(["Paid", "Unpaid"]),
    FeeType: empty ? "" : faker.helpers.arrayElement(["Full", "Partial", "Exempt"]),
    FeePaid: empty ? "" : faker.number.int({ min: 0, max: 1000 }).toString(),
    TotalFee: empty ? "" : faker.number.int({ min: 0, max: 1000 }).toString(),
    PaymentAmount: empty ? "" : faker.number.int({ min: 0, max: 1000 }).toString(),
    RefundAmount: empty ? "" : faker.number.int({ min: 0, max: 100 }).toString(),
    QualificationsReceived: empty ? [] : generateMultipleTopazQualification(3, empty),
    QualificationsAwaiting: empty ? [] : generateMultipleTopazQualification(2, empty),
    PersonalStatement: empty ? "" : faker.lorem.paragraph(),
    ReferenceDetails: generateRandomTopazReferenceDetails(empty),
    ApplicantOtherDetails: generateRandomTopazApplicantOtherDetails(empty),
    MoreAboutYouAndExtraActivities: generateMoreAboutYouAndExtraActivities(empty),
    DataUpdates: {
        ReferenceDetails: generateRandomTopazReferenceDetails(empty),
    },
});

// Random collection Generators
export const generateMultipleRandomTopazApplicants = (number: number = 5, empty: boolean = false): TopazApplicant[] => {
    return faker.helpers.multiple(() => generateRandomTopazApplicant(empty), {
        count: number,
    })
};

export const generateMultipleTopazQualification = (number: number = 5, empty: boolean = false): TopazQualification[] => {
    return faker.helpers.multiple(() => generateRandomTopazQualification(empty), {
        count: number,
    })
};
