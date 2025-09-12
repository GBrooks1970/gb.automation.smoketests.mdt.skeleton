import { UserData } from "./UserData";

export interface UserInfoData {
  usertypeLandingPage: UsertypeLandingPage;
  userdefault: UserData; /* DO NOT CHANGE OR DELETE THIS USER IN env-data FILE*/
  userData: UserData[];
};

export interface UsertypeLandingPage {
  UCAS: string;
  Student: string;
  Adviser: string;
  Provider: string;
  Employer: string;
};