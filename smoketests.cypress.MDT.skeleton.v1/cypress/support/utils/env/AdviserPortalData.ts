import { UkAddress, NonUKAddress, BaseAddress } from "./Address";

export interface AdviserPortalData {
  CycleYearDetails: CycleYearDetails;
  ApplicationsData: ApplicationsData;
  CentresData: CentresData;
  StudentHubActivityDetails: StudentHubActivityDetails;
};

export interface CycleYearDetails {
  CurrentCycleYear: string;
  MaxSupportedCycleYear: string;
};

export interface ApplicationsData {
  EmailApplicantDetails: EmailApplicantDetails[];
  EmailTrackedApplicantDetails: EmailApplicantDetails[];
  ApplicantDetails: ApplicantDetails[];
};

export interface EmailApplicantDetails {
  AdviserName: string;
  Subject: string;
  Message: string;
};

export interface ApplicantDetails {
  PID: string;
  FirstName: string;
  LastName: string;
  CycleYear: string;
  ApplicationStatus: string;
  QualificationsChecked: boolean;
  Deleted: boolean;
  AdviserNotes: string;
  ReferenceStatus: string;
  ReferenceDetails: ReferenceDetails;
  PredictedGradesApplicable: boolean;
  PredictedGrade: string;
  DataUpdates: ApplicantDetailsUpdates;
};

export interface ReferenceDetails {
  RefereeName: string;
  ReferenceGeneralStatement: string;
  ReferenceExtenuatingCircumstances: string;
  ReferenceOther: string;
  ReferenceDatesUnavailable: string;
};

export interface ApplicantDetailsUpdates {
  RefereeName: string;
  ReferenceGeneralStatement: string;
  ReferenceExtenuatingCircumstances: string;
  ReferenceOther: string;
  ReferenceDatesUnavailable: string;
  AdviserNotes: string;
  PredictedGrade: string;
};

export interface CentresData {
  CentreDetails: CentreDetails;
  ContactDetails: ContactDetails[];
  BuzzwordDetails: BuzzwordDetails;
  FeePaymentMethodDetails: FeePaymentMethodDetails[];
  GroupDetails: GroupDetails[];
  QualificationDetails: QualificationDetails[];
  MandatoryRefereeDetails: RefereeDetails[];
  AdditionalRefereeDetails: RefereeDetails[];
  ReferenceTemplateTextDetails: ReferenceTemplateTextDetails;
  OtherCentreDetails: OtherCentreDetails;
};

export interface CentreDetailsUpdates {
  UKAddresses: UkAddress[];
  NonUKAddresses: NonUKAddress[];
  EmailAddresses: string[];
  TelephoneNumbers: string[];
  DatesUnavailable: string[];
};

export interface CentreDetails {
  Name: string;
  CentreNumber: string;
  CentreType: string;
  Address: UkAddress | NonUKAddress;
  Email: string;
  TelephoneNumber: string;
  DatesUnavailable: string;
  DataUpdates: CentreDetailsUpdates;
};

export interface ContactDetails {
  ContactName: string;
  JobTitle: string;
  Role: string;
  Address: UkAddress;
  Email: string;
  PhoneNumber: string;
};

export interface BuzzwordDetailsUpdates {
  Buzzword: string;
};

export interface BuzzwordDetails {
  Buzzword: string;
  DataUpdates: BuzzwordDetailsUpdates;
};

export interface FeePaymentMethodDetails {
  FeePaymentMethodName: string;
  Description: string;
};

export interface GroupDetails {
  GroupName: string;
};

export interface QualificationDetails {
  QualGroup: string;
  QualName: string;
};

export interface RefereeDetails {
  RefereeName: string;
  Occupation: string;
  Email: string;
  Phone: string;
  CentreName: string;
  Address: UkAddress;
};

export interface ReferenceTemplateTextDetails {
  ReferenceTemplateText: string;
  DataUpdates: ReferenceTemplateTextDetailsUpdates;
};

export interface ReferenceTemplateTextDetailsUpdates {
  ReferenceTemplateText: string;
};

export interface OtherCentreDetails {
  CentreNumber: string;
  CentreName: string;
};

export interface StudentHubActivityDetails {
  FirstName: string;
  LastName: string;
  IntendedYearOfApplication: string;
  OtherSchemes: string[];
  Subjects: string[];
  LastLogin: string;
};