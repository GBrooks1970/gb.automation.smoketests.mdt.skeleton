import { UserData } from "../env/UserData";

export interface ExampleData {
  envName: string;
  userdefault: UserData; /* DO NOT CHANGE OR DELETE THIS USER IN env-data FILE*/
  users: UserData[];
  parentComplexData: ParentComplexData;
};

export interface Detail {
  detailId: string
  minor: string,
  major: string
};

export interface Place {
  PlaceId: string
  Country: string,
  City: string
};

export interface Qualification {
  Name: string,
  grades: string
};

export interface ChildComplexData {
  details: Detail[];
  places: Place[];
  Qualifications: Qualification[];
}

export interface ParentComplexData {
  childComplexData: ChildComplexData
};


export let EmptyDetail: Detail = {
  detailId: "defaultDetailId",
  minor: "defaultMinor",
  major: "defaultMajor"
};

export let EmptyPlace: Place = {
  PlaceId: "defaultplaceId",
  Country: "defaultcountry",
  City: "defaultcity"
};

export let EmpltyQualification: Qualification = {
  Name: "defaultName",
  grades: "defaultGrades"
};