import { UkAddress } from "./Address";
import { TopazApplicantOtherDetails } from "./TopazData_TopazApplicantOtherDetails";


export interface TopazApplicant {
  PID: string;
  Scheme: string;
  Profile: TopazApplicantProfile;
  PostCode: string;
  FeePaidStatus: string;
  FeeType: string;
  FeePaid: string;
  TotalFee: string;
  PaymentAmount: string;
  RefundAmount: string;
  QualificationsReceived: TopazQualification[];
  QualificationsAwaiting: TopazQualification[];
  PersonalStatement: string;
  ReferenceDetails: TopazReferenceDetails;
  ApplicantOtherDetails: TopazApplicantOtherDetails;
  MoreAboutYouAndExtraActivities: MoreAboutYouAndExtraActivities;
  DataUpdates: TopazApplicantUpdates;
}

export interface TopazApplicantUpdates {
  ReferenceDetails: TopazReferenceDetails;
}

export interface TopazApplicantProfile {
  Forenames: string;
  Initials: string;
  Surname: string;
  Email: string;
  Gender: string;
  DateOfBirth: string;
  HomeNumber: string;
  MobileNumber: string;
}

export interface TopazQualification {
  Month: string;
  Year: string;
  Body: string;
  Subject: string;
  Level: string;
  Predicted: string;
  Result: string;
  CentreNo: string;
  CentreName: string;
  CandNo: string;
}

export interface TopazReferenceDetails {
  RefereeName: string;
  Post: string;
  Telephone: string;
  Fax: string;
  Email: string;
  Organisation: string;
  Address: UkAddress;
  ReferenceText: string;
}

export interface MoreAboutYouAndExtraActivities {
  MoreAboutYouDetails: TopazMoreAboutYouDetails;
  ExtraActivityDetails: TopazExtraActivityDetail[];
}

export interface TopazMoreAboutYouDetails {
  Disability: string;
  DisabilityFurtherDetails: string;
  OfficialRefugeeStatus: string;
  FreeSchoolMeals: string;
  EstrangedFromParents: string;
  ParentingResponsibilities: string;
  CaringResponsibilities: string;
  ParentInArmedForces: string;
  UKArmedForces: string;
}

export interface TopazExtraActivityDetail {
  TypeOfActivity: string;
  NameOfActivity: string;
  ActivityProvider: string;
  StartDate: string;
  EndDate: string;
}

