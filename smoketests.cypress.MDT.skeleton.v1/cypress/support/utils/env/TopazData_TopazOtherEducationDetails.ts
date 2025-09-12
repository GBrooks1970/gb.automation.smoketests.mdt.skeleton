
export interface TopazOtherEducationDetails {
  SchoolCollegeAndUniversityEducation: TopazSchoolCollegeAndUniversityEducation;
  AdditionalEducation: TopazAdditionalEducation;
  ActivitiesInPreparationForHigherEducation: PreparationForHigherEducationActivity[];
  FirstDegreeOrEquivalent: TopazFirstDegreeOrEquivalent;
  ContentOfFirstDegreeOrEquivalent: TopazDegreeOrEquivalentContent[];
  OtherRelevantQualifications: TopazRelevantQualification[];
  AdditionalUCASTeacherTrainingInformation: TopazAdditionalUCASTeacherTrainingInformation;
}
export interface TopazSchoolCollegeAndUniversityEducation {
  EducationSchoolCollegeUniversity: TopazEducationSchoolCollegeUniversity[];
  JnrDepartmentAcademy: string;
}
export interface TopazAdditionalEducation {
  NAGTY: string;
  HIQE: string;
  HighestExpectedQualification: string;
  ULN: string;
  HIQA: string;
}
export interface PreparationForHigherEducationActivity {
  StartDate: string;
  Duration: string;
  SchoolYear: string;
  Location: string;
  Sponsor: string;
}
export interface TopazDegreeOrEquivalentContent {
  MainSubjectOfDegrees: string;
  MainTimeSpent: string;
  OtherSubjectOfDegrees: string;
  OtherTimeSpent: string;
}
export interface TopazRelevantQualification {
  Title: string;
  MainSubject: string;
  AwardingBody: string;
  Month: string;
  Year: string;
}
export interface TopazEducationSchoolCollegeUniversity {
  NameAndAddress: string;
  From: string;
  To: string;
  FPTime: string;
}
export interface TopazFirstDegreeOrEquivalent {
  NameOfInstitution: string;
  Title: string;
  Class: string;
  TitleOfCourse: string;
  EntryMonth: string;
  EntryYear: string;
  CompletionMonth: string;
  CompletionYear: string;
}
export interface TopazAdditionalUCASTeacherTrainingInformation {
  ProfessionalSkillsTestRegistration: string;
  DateOfNumeracyTest: string;
  UTTHighestExpectedQualification: string;
  ProfessionalSkillsTestRegistrationNumber: string;
  DateOfLiteracyTest: string;
}

