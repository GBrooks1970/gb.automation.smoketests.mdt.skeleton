import { BFPOAddress, NonUKAddress, NonUKAddressWithCountryCode, UkAddress } from "./Address";

export interface ApplyData {
  ContactAndResidencyData: ContactAndResidencyData[];
  EducationData: EducationData;
};

export interface ContactAndResidencyData {
  AreasOfPermanentResidence: AreaOfPermanentResidence[];
  AssessmentEmergencyContactDetails: AssessmentEmergencyContactDetails;
  BFPOAddress: BFPOAddress;
  ContactDetails: ContactDetails;
  NonUKAddress: NonUKAddressWithCountryCode;
  ResidentialCategory: ResidentialCategory;
  ThirdPartyDetails: ThirdPartyDetails;
  UKAddress: UkAddress;
};

export interface AssessmentEmergencyContactDetails {
  Name: string;
  Number: string;
};

export interface AreaOfPermanentResidence {
  Name: string;
  Value: string;
  AddressType: string;
};

export interface ContactDetails {
  MobileNumber: string;
  OtherNumber: string;
  OtherEmailAddress: string;
};

export interface ResidentialCategory {
  Name: string;
  Value: string;
};

export interface ThirdPartyDetails {
  Name: string;
  Relationship: string;
};

export interface EducationData {
  EducationDetails: EducationDetails[];
  PlacesOfEducation: PlaceOfEducation[];
  EDQualifications: EDQualification[];
};

export interface EducationDetails {
  ULN: string;
  HighestExpectedQualification: string;
};

export interface PlaceOfEducation {
  Name: string;
  StartDate:  string;
  EndDate: string;
  StudyType: string;
  Qualifications: string;
};

export interface EDQualification {
  QualName: string;
  QualDate: string;
  QualTitle: string | undefined;
  AwardingBody: string | undefined;
  AwardingBodyOther: string | undefined;
  Grade: string | undefined;
  GradeOther: string | undefined;
  Modules: EDQualificationModule[] | undefined;
};

export interface EDQualificationModule {
  ModuleTitle: string;
  ModuleDate: string;
  Grade: string;
  GradeOther: string;
};