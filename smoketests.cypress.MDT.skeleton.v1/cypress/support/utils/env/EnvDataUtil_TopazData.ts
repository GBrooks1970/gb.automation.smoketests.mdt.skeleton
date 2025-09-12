import { TopazMaintainFeeReasons, TopazData, DTO_ApplicationDetail } from "./TopazData";
import { TopazApplicant } from "./TopazData_TopazApplicant";
import { EmptyTopazUserData, TopazUserData } from "./UserData";
import topazEnvironmentData from '../../../fixtures/env-data_Topaz.json'

export class EnvDataUtil_TopazData {
    protected data?: TopazData;

    constructor() {
        this.data = EnvDataUtil_TopazData.LoadFixtureData();
    };

    static LoadFixtureData(): TopazData {
        return topazEnvironmentData as TopazData;
    };

    getAllTopazData(): TopazData {
        if (!this.data) {
            throw new Error(`${this.getAllTopazData.name} : Topaz Data is undefined`);
        };
        return this.data;
    };

    getTopazUserDefault(): TopazUserData {
        if (!this.data || !this.data.UserDefault) {
            throw new Error(`${this.getTopazUserDefault.name} : Topaz User Data is undefined`);
        };
        return this.data.UserDefault;
    };

    getTopazUserByIndex(index: number): TopazUserData {
        if (!this.data) {
            throw new Error(`${this.getTopazUserByIndex.name} : Topaz User Data is undefined`);
        };
        
        let user = this.data.Users[index];
        if (!user)
            user = EmptyTopazUserData;
        
        console.log(`User getTopazUserByIndex[${index}] userData: ${JSON.stringify(user)}`);
        return user;
    };

    getTopazUserByUsername(username: string): TopazUserData {
        if (!this.data || !this.data.Users) {
            throw new Error(`${this.getTopazUserByUsername.name} : Topaz User Data is undefined`);
        };
        let user = this.data.Users.find(user => user.username === username);
        if (!user)
            user = EmptyTopazUserData;
        return user;
    };

    getAllTopazUsers(): TopazUserData[] {
        if (!this.data || !this.data.Users) {
            throw new Error(`${this.getAllTopazUsers.name} : Topaz User Data is undefined`);
        };
        return this.data.Users;
    };

    getAllTopazMaintainFeeReasons(): TopazMaintainFeeReasons[] {
        if (!this.data || !this.data.MaintainFeeReasons) {
            throw new Error(`${this.getAllTopazMaintainFeeReasons.name} : Topaz MaintainFeeReasons Data is undefined`);
        };
        return this.data.MaintainFeeReasons;
    };

    getAllTopazApplicantDetails(): TopazApplicant[] {
        if (!this.data || !this.data.ApplicantDetails) {
            throw new Error(`${this.getAllTopazApplicantDetails.name} : Topaz Applicant Details Data is undefined`);
        };
        return this.data.ApplicantDetails;
    };

    getTopazApplicantDetailsByPID(PID: string): TopazApplicant {
        const allApplicantDetails = this.getAllTopazApplicantDetails();
        const applicantDetailsByPID = allApplicantDetails.find(applicant => applicant.PID === PID);
        if (applicantDetailsByPID) {
            return applicantDetailsByPID;
        } else {
            throw new Error(`${this.getTopazApplicantDetailsByPID.name} : Topaz ApplicantDetails PID: ${PID} not found`);
        };
    };

    getAllTopazApplicantDetailsByScheme(scheme: string): TopazApplicant[] {
        if (!this.data || !this.data.ApplicantDetails) {
            throw new Error(`${this.getAllTopazApplicantDetailsByScheme.name} : Topaz Applicant Details Data is undefined`);
        };
        if (scheme === 'All') {
            const allSearchApplicantsByScheme = this.data.ApplicantDetails;
            return allSearchApplicantsByScheme;
        } else {
            const allSearchApplicantsByScheme = this.data.ApplicantDetails.filter(applicant => applicant.Scheme === scheme);
            return allSearchApplicantsByScheme;
        };
    };

    getAllTopazApplicantDetailsByFeePaidStatus(feePaidStatus: string): TopazApplicant[] {
        if (!this.data || !this.data.ApplicantDetails) {
            throw new Error(`${this.getAllTopazApplicantDetailsByFeePaidStatus.name} : Topaz Applicant Details Data is undefined`);
        };
        if (feePaidStatus === 'All') {
            const allSearchApplicantsByFeePaidStatus = this.data.ApplicantDetails
            return allSearchApplicantsByFeePaidStatus
        } else {
            const allSearchApplicantsByFeePaidStatus = this.data.ApplicantDetails.filter(applicant => applicant.FeePaidStatus === feePaidStatus);
            return allSearchApplicantsByFeePaidStatus
        };
    };
};