import { AdviserPortalData } from "./AdviserPortalData";
import { ApplyData } from "./ApplyData";
import { EmployerData } from "./EmployerData";
import { TopazData } from "./TopazData";
import { UserInfoData } from "./UserInfoData";

export interface EnvironmentData {
  envName: string;
  endpoints: Endpoints;
  users: UserInfoData;
  Employer: EmployerData;
  Apply: ApplyData;
  Topaz: TopazData;
  AdviserPortal: AdviserPortalData;
};

export interface Endpoints {
  baseUrl: string;
  baseUrlDigital: string;
  baseUrlAccounts: string;
  baseUrlServices: string;
  accountLogin: string;
  accountLogout: string;
  accountSignedout: string;
  accountRequestresetpassword: string;
  topazURL: string;
  employerSearchVacancyURL: string;
  b2bhub: string;
  searchDashboard: string;
};