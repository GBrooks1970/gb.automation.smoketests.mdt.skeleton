import { UkAddressWithCountry } from "./Address";
import { TopazOtherEducationDetails } from "./TopazData_TopazOtherEducationDetails";


export interface TopazApplicantOtherDetails {
  OtherPersonalDetails: TopazOtherPersonalDetails;
  OtherMisc01Details: TopazOtherMisc01Details;
  OtherMisc02Details: TopazOtherMisc02Details;
  OtherEducationDetails: TopazOtherEducationDetails;
  EmergencyContact: TopazEmergencyContact;
  CatchQuestions: TopazCatchQuestions;
  PassportDetails: TopazPassportDetails;
  DetailsOfPaidEmployment: TopazPaidEmployment[];
  Languages: TopazLanguageEducation[];
  PreviousNursingMidwiferyEducation: TopazNursingMidwiferyEducation[];
}

export interface TopazOtherPersonalDetails {
  HomeAddress: UkAddressWithCountry;
  SecondEmail: string;
  ParentalOccupation: string;
  PrefferredFirstName: string;
  PreviousSurname: string;
  ResidentialStatus: string;
  AreaOfPermanentResidence: string;
  CountryOfBirth: string;
  Nationality: string;
  DualNationality: string;
  LivedOrWorkedEU: string;
  ParentEUNational: string;
  DateOfUKEntry: string;
  OutputLanguage: string;
  LargeFontRequired: string;
  NationalId1: string;
  NationalId2: string;
}

export interface TopazOtherMisc01Details {
  ScottishCandidateNumber: string;
  BTECRegistration: string;
  StudentSupportArranagements: string;
  LA: string;
  FeeCode: string;
  BeenInCare: string;
  TimeInCare: string;
  IdentifiesAsTransgender: string;
  IELTS: string;
  TOEFL: string;
  DIDS4Digit: string;
  DIDS16Digit: string;
  Disability: string;
  SpecialNeeds: string;
  Dependants: string;
  EthnicOrigin: string;
  Religion: string;
  SexualOrientation: string;
  CriminalConviction: string;
  DBSCheck: string;
  ISANumber: string;
  ParentalHE: string;
  UnavailableInterviewDates: string;
}

export interface TopazOtherMisc02Details {
  NationalInsuranceNumber: string;
  PrefferredRegion: string;
  DeptHealthRegistration: string;
  SchoolCode: string;
  ProgressFile: string;
  SLCStudentFinanceApplying: string;
  SAASStudentFinanceApplying: string;
  EarliestStart: string;
  SecondmentPlace: string;
  IndefiniteUKLeave: string;
  LastEstablishment: string;
  SLCStudentFinanceShareDetails: string;
  SAASStudentFinanceShareDetails: string;
  NearestEdInstitution: string;
  EligibleForNHSBursary: string;
  SelfFunding: string;
  TTANumber: string;
  TTAMatchingAllowed: string;
  StudentFinanceReminder: string;
}

export interface TopazCatchQuestions {
  NationalInsuranceNumber: string;
  CATCHQuestionsAsked: string;
  NMCPIN: string;
}

export interface TopazPassportDetails {
  StudentVisaRequired: string;
  PassportNumber: string;
  PassportPlaceOfIssue: string;
  PreviouslyStudiedInUkOnStudentVisa: string;
  PassportIssueDate: string;
  PassportExpiryDate: string;
  SettledInUK: string;
}
export interface TopazLanguageEducation {
  NameOfLanguage: string;
  EducationReceived: string;
  Qualifications: string;
}

export interface TopazPaidEmployment {
  NameAndAddress: string;
  NatureOfWork: string;
  From: string;
  To: string;
  FP: string;
}
export interface TopazEmergencyContact {
  ContactName: string;
  PhoneNumber: string;
}

export interface TopazNursingMidwiferyEducation {
  NameAndAddress: string;
  Programme: string;
  Qualification: string;
  From: string;
  To: string;
  PIN: string;
}

