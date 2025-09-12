import { TopazApplicant } from "cypress/support/utils/env/TopazData_TopazApplicant";

export let TestData_TopazApplicant_Empty: TopazApplicant = {
    PID: "",
    Scheme: "",
    Profile: {
        Forenames: "",
        Initials: "",
        Surname: "",
        Email: "",
        Gender: "",
        DateOfBirth: "",
        HomeNumber: "",
        MobileNumber: ""
    },
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
    },
    ApplicantOtherDetails: {
        OtherPersonalDetails: {
            HomeAddress: {
                Country: "",
                PostCode: "",
                AddressLines: []
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
            NationalId2: ""
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
            UnavailableInterviewDates: ""
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
            StudentFinanceReminder: ""
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
            }
        },
        EmergencyContact: {
            ContactName: "",
            PhoneNumber: ""
        },
        CatchQuestions: {
            NationalInsuranceNumber: "",
            CATCHQuestionsAsked: "",
            NMCPIN: ""
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
        DetailsOfPaidEmployment: [],
        Languages: [],
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
