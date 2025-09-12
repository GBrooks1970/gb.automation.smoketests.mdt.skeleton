import { TopazApplicant } from "./TopazData_TopazApplicant";
import { TopazUserData } from "./UserData";

export interface TopazData {
  UserDefault: TopazUserData;
  Users: TopazUserData[];
  ApplicantDetails: TopazApplicant[];
  MaintainFeeReasons: TopazMaintainFeeReasons[];
}

export interface TopazMaintainFeeReasons {
  Reason: string;
}

export interface DTO_ApplicationDetail {
  Surname: string;
  Forenames: string;
  DateOfBirth: string;
  Gender: string;
  Scheme: string;
  PostCode: string;
}

