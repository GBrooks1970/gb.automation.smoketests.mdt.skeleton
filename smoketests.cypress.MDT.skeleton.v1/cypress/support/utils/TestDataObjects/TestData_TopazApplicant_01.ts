import { TopazApplicant } from "cypress/support/utils/env/TopazData_TopazApplicant";

// Example structure of TopazApplicant
export const TestData_TopazApplicant_01: TopazApplicant = {
    PID: "1234567890",
    Scheme: "UCAS",
    Profile: {
        Forenames: "John",
        Initials: "J",
        Surname: "Doe",
        Email: "john.doe@example.com",
        Gender: "Male",
        DateOfBirth: "1990/01/01",
        HomeNumber: "1234567890",
        MobileNumber: "0987654321",
    },
    PostCode: "AB12CD",
    FeePaidStatus: "Paid",
    FeeType: "Full",
    FeePaid: "500",
    TotalFee: "500",
    PaymentAmount: "500",
    RefundAmount: "0",
    QualificationsReceived: [],
    QualificationsAwaiting: [],
    PersonalStatement: "A personal statement.",
    ReferenceDetails: {
        RefereeName: "Jane Smith",
        Post: "Manager",
        Organisation: "Example Organisation",
        Address: {
            AddressLines: ["123 Street", "City", "State", "Country"],
            PostCode: "AB12CD",
        },
        Telephone: "1234567890",
        Fax: "0987654321",
        Email: "jane.smith@example.com",
        ReferenceText: "A reference text.",
    },
    ApplicantOtherDetails: {
        OtherPersonalDetails: {
            HomeAddress: {
                AddressLines: ["123 Street", "City", "State"],
                PostCode: "AB12CD",
                Country: "England"
            },
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
        OtherMisc01Details: {
            ScottishCandidateNumber: "",
            BTECRegistration: "",
            StudentSupportArranagements: "",
            LA: "",
            FeeCode: "",
            BeenInCare: "",
            TimeInCare: "",
            IdentifiesAsTransgender: "",
            IELTS: "",
            TOEFL: "",
            DIDS4Digit: "",
            DIDS16Digit: "",
            Disability: "",
            SpecialNeeds: "",
            Dependants: "",
            EthnicOrigin: "",
            Religion: "",
            SexualOrientation: "",
            CriminalConviction: "",
            DBSCheck: "",
            ISANumber: "",
            ParentalHE: "",
            UnavailableInterviewDates: "",
        },
        PassportDetails: {
            StudentVisaRequired: "",
            PassportNumber: "",
            PassportPlaceOfIssue: "",
            PreviouslyStudiedInUkOnStudentVisa: "",
            PassportIssueDate: "",
            PassportExpiryDate: "",
            SettledInUK: ""
        },
        OtherMisc02Details: {
            NationalInsuranceNumber: "",
            PrefferredRegion: "",
            DeptHealthRegistration: "",
            SchoolCode: "",
            ProgressFile: "",
            SLCStudentFinanceApplying: "",
            SAASStudentFinanceApplying: "",
            EarliestStart: "",
            SecondmentPlace: "",
            IndefiniteUKLeave: "",
            LastEstablishment: "",
            SLCStudentFinanceShareDetails: "",
            SAASStudentFinanceShareDetails: "",
            NearestEdInstitution: "",
            EligibleForNHSBursary: "",
            SelfFunding: "",
            TTANumber: "",
            TTAMatchingAllowed: "",
            StudentFinanceReminder: "",
        },
        OtherEducationDetails: {
            SchoolCollegeAndUniversityEducation: {
                EducationSchoolCollegeUniversity: [],
                JnrDepartmentAcademy: ""
            },
            AdditionalEducation: {
                NAGTY: "",
                HIQE: "",
                HighestExpectedQualification: "",
                ULN: "",
                HIQA: ""
            },
            ActivitiesInPreparationForHigherEducation: [],
            FirstDegreeOrEquivalent: {
                NameOfInstitution: "",
                Title: "",
                Class: "",
                TitleOfCourse: "",
                EntryMonth: "",
                EntryYear: "",
                CompletionMonth: "",
                CompletionYear: ""
            },
            ContentOfFirstDegreeOrEquivalent: [],
            OtherRelevantQualifications: [],
            AdditionalUCASTeacherTrainingInformation: {
                ProfessionalSkillsTestRegistration: "",
                DateOfNumeracyTest: "",
                UTTHighestExpectedQualification: "",
                ProfessionalSkillsTestRegistrationNumber: "",
                DateOfLiteracyTest: ""
            },
        },
        CatchQuestions: {
            NationalInsuranceNumber: "",
            CATCHQuestionsAsked: "",
            NMCPIN: ""
        },
        DetailsOfPaidEmployment: [],
        Languages: [],
        EmergencyContact: {
            ContactName: "",
            PhoneNumber: ""
        },
        PreviousNursingMidwiferyEducation: []
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
            UKArmedForces: ""
        },
        ExtraActivityDetails: []
    },
    DataUpdates: {
        ReferenceDetails: {
            RefereeName: "",
            Post: "",
            Telephone: "",
            Fax: "",
            Email: "",
            Organisation: "",
            Address: {
                PostCode: "",
                AddressLines: []
            },
            ReferenceText: ""
        }
    }
};


