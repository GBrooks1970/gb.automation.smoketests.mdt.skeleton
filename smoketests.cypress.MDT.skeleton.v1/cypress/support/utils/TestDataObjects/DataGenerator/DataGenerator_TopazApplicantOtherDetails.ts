import { faker } from "@faker-js/faker";
import { TopazApplicantOtherDetails, TopazOtherPersonalDetails, TopazOtherMisc01Details, TopazOtherMisc02Details, TopazEmergencyContact, TopazCatchQuestions, TopazPassportDetails, TopazPaidEmployment, TopazLanguageEducation, TopazNursingMidwiferyEducation } from "../../env/TopazData_TopazApplicantOtherDetails";
import { TopazOtherEducationDetails } from "../../env/TopazData_TopazOtherEducationDetails";
import { generateRandomUkAddressWithCountry } from "./DataGenerator_Address";



// TopazApplicantOtherDetails Generator
export const generateRandomTopazApplicantOtherDetails = (empty: boolean = false): TopazApplicantOtherDetails => ({
    OtherPersonalDetails: generateRandomTopazOtherPersonalDetails(empty),
    OtherMisc01Details: generateRandomTopazOtherMisc01Details(empty),
    OtherMisc02Details: generateRandomTopazOtherMisc02Details(empty),
    OtherEducationDetails: generateOtherEducationDetails(empty),
    EmergencyContact: generateRandomEmergencyContact(empty),
    CatchQuestions: generateRandomCatchQuestions(empty),
    PassportDetails: generateRandomPassportDetails(empty),
    DetailsOfPaidEmployment: Array.from({ length: 3 }, () => (generateRandomTopazPaidEmployment(empty))),
    Languages: Array.from({ length: 3 }, () => (generateRandomTopazLanguageEducation(empty))),
    PreviousNursingMidwiferyEducation: Array.from({ length: 2 }, () => (generateRandomTopazNursingMidwiferyEducation(empty))),
});
export const generateRandomTopazOtherPersonalDetails = (empty: boolean = false): TopazOtherPersonalDetails => ({
    HomeAddress: generateRandomUkAddressWithCountry(),
    SecondEmail: empty ? "" : faker.internet.email(),
    ParentalOccupation: empty ? "" : faker.person.jobTitle(),
    PrefferredFirstName: empty ? "" : faker.person.firstName(),
    PreviousSurname: empty ? "" : faker.person.lastName(),
    ResidentialStatus: empty ? "" : faker.helpers.arrayElement(["Resident", "Non-Resident"]),
    AreaOfPermanentResidence: empty ? "" : faker.location.city(),
    CountryOfBirth: empty ? "" : faker.location.country(),
    Nationality: empty ? "" : faker.location.country(),
    DualNationality: empty ? "" : faker.location.country(),
    LivedOrWorkedEU: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    ParentEUNational: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    DateOfUKEntry: empty ? "" : faker.date.past({ years: 20 }).toISOString().split("T")[0],
    OutputLanguage: empty ? "" : faker.helpers.arrayElement(["English", "French", "Spanish"]),
    LargeFontRequired: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    NationalId1: empty ? "" : faker.string.uuid(),
    NationalId2: empty ? "" : faker.string.uuid(),
});
export const generateRandomTopazOtherMisc01Details = (empty: boolean = false): TopazOtherMisc01Details => ({
    ScottishCandidateNumber: empty ? "" : faker.string.numeric(10),
    BTECRegistration: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    StudentSupportArranagements: empty ? "" : faker.lorem.sentence(),
    LA: empty ? "" : faker.company.name(),
    FeeCode: empty ? "" : faker.string.alphanumeric(6),
    BeenInCare: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    TimeInCare: empty ? "" : faker.string.numeric(2),
    IdentifiesAsTransgender: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    IELTS: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    TOEFL: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    DIDS4Digit: empty ? "" : faker.string.numeric(4),
    DIDS16Digit: empty ? "" : faker.string.numeric(16),
    Disability: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    SpecialNeeds: empty ? "" : faker.lorem.sentence(),
    Dependants: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    EthnicOrigin: empty ? "" : faker.lorem.word(),
    Religion: empty ? "" : faker.lorem.word(),
    SexualOrientation: empty ? "" : faker.lorem.word(),
    CriminalConviction: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    DBSCheck: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    ISANumber: empty ? "" : faker.string.uuid(),
    ParentalHE: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    UnavailableInterviewDates: empty ? "" : faker.lorem.sentence(),
});
export const generateRandomTopazOtherMisc02Details = (empty: boolean = false): TopazOtherMisc02Details => ({
    NationalInsuranceNumber: empty ? "" : faker.string.alphanumeric(9),
    PrefferredRegion: empty ? "" : faker.location.city(),
    DeptHealthRegistration: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    SchoolCode: empty ? "" : faker.string.alphanumeric(5),
    ProgressFile: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    SLCStudentFinanceApplying: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    SAASStudentFinanceApplying: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    EarliestStart: empty ? "" : faker.date.future({ years: 1 }).toISOString().split("T")[0],
    SecondmentPlace: empty ? "" : faker.location.city(),
    IndefiniteUKLeave: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    LastEstablishment: empty ? "" : faker.company.name(),
    SLCStudentFinanceShareDetails: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    SAASStudentFinanceShareDetails: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    NearestEdInstitution: empty ? "" : faker.location.city(),
    EligibleForNHSBursary: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    SelfFunding: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    TTANumber: empty ? "" : faker.string.alphanumeric(8),
    TTAMatchingAllowed: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    StudentFinanceReminder: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
});
export const generateRandomEmergencyContact = (empty: boolean = false): TopazEmergencyContact => ({
    ContactName: empty ? "" : faker.person.fullName(),
    PhoneNumber: empty ? "" : faker.phone.number(),
});
export const generateRandomCatchQuestions = (empty: boolean = false): TopazCatchQuestions => ({
    NationalInsuranceNumber: empty ? "" : faker.string.alphanumeric(9),
    CATCHQuestionsAsked: empty ? "" : faker.lorem.words(5),
    NMCPIN: empty ? "" : faker.string.alphanumeric(6),
});
export const generateRandomPassportDetails = (empty: boolean = false): TopazPassportDetails => ({
    StudentVisaRequired: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    PassportNumber: empty ? "" : faker.string.uuid(),
    PassportPlaceOfIssue: empty ? "" : faker.location.city(),
    PreviouslyStudiedInUkOnStudentVisa: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
    PassportIssueDate: empty ? "" : faker.date.past({ years: 5 }).toISOString().split("T")[0],
    PassportExpiryDate: empty ? "" : faker.date.future({ years: 5 }).toISOString().split("T")[0],
    SettledInUK: empty ? "" : faker.helpers.arrayElement(["Yes", "No"]),
});
export const generateRandomTopazPaidEmployment = (empty: boolean = false): TopazPaidEmployment => ({
    NameAndAddress: empty ? "" : faker.company.name(),
    NatureOfWork: empty ? "" : faker.lorem.words(3),
    From: empty ? "" : faker.date.past({ years: 5 }).toISOString().split("T")[0],
    To: empty ? "" : faker.date.recent({ days: 5 }).toISOString().split("T")[0],
    FP: empty ? "" : faker.helpers.arrayElement(["Full-time", "Part-time"]),
});
export const generateRandomTopazLanguageEducation = (empty: boolean = false): TopazLanguageEducation => ({
    NameOfLanguage: empty ? "" : faker.helpers.arrayElement(["English", "French", "Spanish"]),
    EducationReceived: empty ? "" : faker.lorem.words(3),
    Qualifications: empty ? "" : faker.lorem.words(3),
});
export const generateRandomTopazNursingMidwiferyEducation = (empty: boolean = false): TopazNursingMidwiferyEducation => ({
    NameAndAddress: empty ? "" : faker.company.name(),
    Programme: empty ? "" : faker.lorem.words(3),
    Qualification: empty ? "" : faker.lorem.words(2),
    From: empty ? "" : faker.date.past({ years: 10 }).toISOString().split("T")[0],
    To: empty ? "" : faker.date.recent({ days: 5 }).toISOString().split("T")[0],
    PIN: empty ? "" : faker.string.uuid(),
});
export const generateOtherEducationDetails = (empty: boolean = false): TopazOtherEducationDetails => ({
    SchoolCollegeAndUniversityEducation: {
        EducationSchoolCollegeUniversity: Array.from({ length: 3 }, () => ({
            NameAndAddress: empty ? "" : faker.company.name(),
            From: empty ? "" : faker.date.past({ years: 10 }).toISOString().split("T")[0],
            To: empty ? "" : faker.date.recent({ days: 5 }).toISOString().split("T")[0],
            FPTime: empty ? "" : faker.helpers.arrayElement(["Full-time", "Part-time"]),
        })),
        JnrDepartmentAcademy: empty ? "" : faker.company.name(),
    },
    AdditionalEducation: {
        NAGTY: empty ? "" : faker.string.alphanumeric(10),
        HIQE: empty ? "" : faker.string.alphanumeric(10),
        HighestExpectedQualification: empty ? "" : faker.lorem.words(3),
        ULN: empty ? "" : faker.string.uuid(),
        HIQA: empty ? "" : faker.string.alphanumeric(10),
    },
    ActivitiesInPreparationForHigherEducation: Array.from({ length: 2 }, () => ({
        StartDate: empty ? "" : faker.date.past({ years: 5 }).toISOString().split("T")[0],
        Duration: `${faker.number.int({ min: 1, max: 12 })} months`,
        SchoolYear: empty ? "" : faker.helpers.arrayElement(["Year 11", "Year 12", "Year 13"]),
        Location: empty ? "" : faker.location.city(),
        Sponsor: empty ? "" : faker.company.name(),
    })),
    FirstDegreeOrEquivalent: {
        NameOfInstitution: empty ? "" : faker.company.name(),
        Title: empty ? "" : faker.lorem.words(3),
        Class: empty ? "" : faker.helpers.arrayElement(["First", "Second", "Third"]),
        TitleOfCourse: empty ? "" : faker.lorem.words(3),
        EntryMonth: empty ? "" : faker.date.month(),
        EntryYear: empty ? "" : faker.date.past({ years: 10 }).getFullYear().toString(),
        CompletionMonth: empty ? "" : faker.date.month(),
        CompletionYear: empty ? "" : faker.date.past({ years: 5 }).getFullYear().toString(),
    },
    ContentOfFirstDegreeOrEquivalent: Array.from({ length: 3 }, () => ({
        MainSubjectOfDegrees: empty ? "" : faker.lorem.words(3),
        MainTimeSpent: `${faker.number.int({ min: 1, max: 100 })}%`,
        OtherSubjectOfDegrees: empty ? "" : faker.lorem.words(3),
        OtherTimeSpent: `${faker.number.int({ min: 1, max: 50 })}%`,
    })),
    OtherRelevantQualifications: Array.from({ length: 2 }, () => ({
        Title: empty ? "" : faker.lorem.words(2),
        MainSubject: empty ? "" : faker.lorem.word(),
        AwardingBody: empty ? "" : faker.company.name(),
        Month: empty ? "" : faker.date.month(),
        Year: empty ? "" : faker.date.past({ years: 10 }).getFullYear().toString(),
    })),
    AdditionalUCASTeacherTrainingInformation: {
        ProfessionalSkillsTestRegistration: empty ? "" : faker.string.alphanumeric(12),
        DateOfNumeracyTest: empty ? "" : faker.date.past({ years: 2 }).toISOString().split("T")[0],
        UTTHighestExpectedQualification: empty ? "" : faker.lorem.words(3),
        ProfessionalSkillsTestRegistrationNumber: empty ? "" : faker.string.alphanumeric(8),
        DateOfLiteracyTest: empty ? "" : faker.date.past({ years: 2 }).toISOString().split("T")[0],
    },
});

