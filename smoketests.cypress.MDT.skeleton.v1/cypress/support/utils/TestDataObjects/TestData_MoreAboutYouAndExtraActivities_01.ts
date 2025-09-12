import { MoreAboutYouAndExtraActivities } from "../env/TopazData_TopazApplicant";

// Example structure of MoreAboutYouAndExtraActivities

export const TestData_MoreAboutYouAndExtraActivities_01: MoreAboutYouAndExtraActivities = {
    MoreAboutYouDetails: {
        Disability: "No",
        DisabilityFurtherDetails: "",
        OfficialRefugeeStatus: "No",
        FreeSchoolMeals: "Yes",
        EstrangedFromParents: "No",
        ParentingResponsibilities: "Yes",
        CaringResponsibilities: "No",
        ParentInArmedForces: "Yes",
        UKArmedForces: "No",
    },
    ExtraActivityDetails: [
        {
            TypeOfActivity: "Volunteering",
            NameOfActivity: "Community Service",
            ActivityProvider: "Local NGO",
            StartDate: "2022-01-01",
            EndDate: "2022-06-01",
        },
        {
            TypeOfActivity: "Sports",
            NameOfActivity: "Basketball Team",
            ActivityProvider: "University Club",
            StartDate: "2021-09-01",
            EndDate: "2022-05-01",
        },
    ],
};
