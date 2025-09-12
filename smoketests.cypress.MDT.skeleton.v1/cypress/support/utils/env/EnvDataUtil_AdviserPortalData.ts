import { AdviserPortalData, ApplicantDetails, CentresData, CycleYearDetails, ApplicationsData, EmailApplicantDetails, FeePaymentMethodDetails, GroupDetails, QualificationDetails, RefereeDetails, BuzzwordDetails, ReferenceTemplateTextDetails, CentreDetails, StudentHubActivityDetails } from "./AdviserPortalData";
import { SymbolsDT, SymbolsOBS }from "../symbol-consts";
import adviserPortalEnvironmentData from '../../../fixtures/env-data_AdviserPortal.json'
import { UCAS } from "../UCAS-consts";
import { NonUKAddress, UkAddress } from "./Address";

export class EnvDataUtil_AdviserPortalData {
    protected data?: AdviserPortalData;

    constructor() {
        this.data = EnvDataUtil_AdviserPortalData.LoadFixtureData();
    };

    static LoadFixtureData(): AdviserPortalData {
        return adviserPortalEnvironmentData as AdviserPortalData;
    };

    getAdviserPortalData(): AdviserPortalData {
        if (!this.data ) {
            throw new Error(`${this.getAdviserPortalData.name} : AdviserPortalData is undefined`);
        };
        return this.data;
    };

    getCycleYearDetails(): CycleYearDetails {
        if (!this.data || !this.data.CycleYearDetails) {
            throw new Error(`${this.getCycleYearDetails.name} : CycleYearDetails Data is undefined`);
        };
        return this.data.CycleYearDetails;
    };

    getAllApplicationsData(): ApplicationsData {
        if (!this.data || !this.data.ApplicationsData) {
            throw new Error(`${this.getAllApplicationsData.name} : ApplicationData is undefined`);
        };
        return this.data.ApplicationsData;
    };

    getAllApplicationsEmailApplicantDetails(): EmailApplicantDetails[] {
        if (!this.data || !this.data.ApplicationsData) {
            throw new Error(`${this.getAllApplicationsData.name} : ApplicationData is undefined`);
        };
        return this.data.ApplicationsData.EmailApplicantDetails;
    };

    getAllApplicationsEmailTrackedApplicantDetails(): EmailApplicantDetails[] {
        if (!this.data || !this.data.ApplicationsData.EmailTrackedApplicantDetails) {
            throw new Error(`${this.getAllApplicationsEmailTrackedApplicantDetails.name} : ApplicationsEmailTrackedApplicantDetailsData is undefined`);
        };
        return this.data.ApplicationsData.EmailTrackedApplicantDetails;
    };

    getAllApplicationsApplicantDetailsData(): ApplicantDetails[] {
        const applicationsData = this.getAllApplicationsData();

        if (!this.data || !applicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllApplicationsApplicantDetailsData.name} : ApplicationsApplicantDetailsData is undefined`);
        };
        return applicationsData.ApplicantDetails;
    };

    getAllCentresData(): CentresData {
        if (!this.data || !this.data.CentresData) {
            throw new Error(`${this.getAllCentresData.name} : CentresData is undefined`);
        };
        return this.data.CentresData;
    };

    getAllApplicationsApplicantDetailsByAppStatus(appStatus: string): ApplicantDetails[] {
        let allApplicantDetailsByAppStatus: ApplicantDetails[];

        if (!this.data || !this.data.ApplicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllApplicationsApplicantDetailsByAppStatus.name} : ApplicationsApplicantDetailsData is undefined`);
        };

        if (appStatus === UCAS.constants.AdviserAppStatus.deleted) {
            allApplicantDetailsByAppStatus = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.Deleted === true);
        } else {
            allApplicantDetailsByAppStatus = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.ApplicationStatus === appStatus && applicant.Deleted === false);
        };
        return allApplicantDetailsByAppStatus;
    };

    getAllApplicationsApplicantDetailsExcludingDeleted(): ApplicantDetails[] {
        let allApplicantDetailsExcludingDeleted: ApplicantDetails[];

        if (!this.data || !this.data.ApplicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllApplicationsApplicantDetailsByAppStatus.name} : ApplicationsApplicantDetailsData is undefined`);
        };
        allApplicantDetailsExcludingDeleted = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.Deleted !== true);   
        return allApplicantDetailsExcludingDeleted;
    };

    getAllApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag(appStatus: string, qualsChecked: boolean): ApplicantDetails[] {
        let allApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag: ApplicantDetails[];

        if (!this.data || !this.data.ApplicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag.name} : ApplicationApplicantDetailsData is undefined`);
        };
        
        if (appStatus === UCAS.constants.AdviserAppStatus.deleted) {
            allApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.Deleted === true && applicant.QualificationsChecked === qualsChecked);
        } else {
            allApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.ApplicationStatus === appStatus && applicant.Deleted === false && applicant.QualificationsChecked === qualsChecked);
        };
        return allApplicationsApplicantDetailsByAppStatusAndQualsCheckedFlag;
    };

    getAllDeletedApplicationsApplicantDetailsByAppStatus(appStatus: string): ApplicantDetails[] {
        let allDeletedApplicationsApplicantDetailsByAppStatus: ApplicantDetails[];

        if (!this.data || !this.data.ApplicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllDeletedApplicationsApplicantDetailsByAppStatus.name} : ApplicationsApplicantDetailsData is undefined`);
        }; 
        allDeletedApplicationsApplicantDetailsByAppStatus = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.ApplicationStatus === appStatus && applicant.Deleted === true);
        return allDeletedApplicationsApplicantDetailsByAppStatus;
    };

    getAllApplicationsApplicantDetailsByRefStatusExcludingDeletedSent(refStatus: string): ApplicantDetails[] {
        let allApplicationsApplicantDetailsByRefStatusExcludingDeletedSent: ApplicantDetails[];

        if (!this.data || !this.data.ApplicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllApplicationsApplicantDetailsByRefStatusExcludingDeletedSent.name} : ApplicationsApplicantDetailsData is undefined`);
        }; 
        allApplicationsApplicantDetailsByRefStatusExcludingDeletedSent = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.Deleted === false && applicant.ApplicationStatus !== UCAS.constants.AdviserAppStatus.sent && applicant.ReferenceStatus === refStatus);
        return allApplicationsApplicantDetailsByRefStatusExcludingDeletedSent;
    };

    getAllApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent(refStatus: string): ApplicantDetails[] {
        let allApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent: ApplicantDetails[];
        
        if (!this.data || !this.data.ApplicationsData.ApplicantDetails) {
            throw new Error(`${this.getAllApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent.name} : ApplicationsApplicantDetailsData is undefined`);
        };
        allApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent = this.getAllApplicationsApplicantDetailsData().filter(applicant => applicant.Deleted === false && applicant.ApplicationStatus !== UCAS.constants.AdviserAppStatus.sent && applicant.ReferenceStatus === refStatus && applicant.PredictedGradesApplicable === true); 
        return allApplicationsApplicantDetailsByRefStatusAndPredictedGradesApplicableExcludingDeletedSent;
    };

    getAllCentreManagementGroupDetails(): GroupDetails[] {
        if (!this.data || !this.data.CentresData.GroupDetails) {
            throw new Error(`${this.getAllCentreManagementGroupDetails.name} : GroupDetailsData is undefined`);
        };
        return this.data.CentresData.GroupDetails;
    };

    getAllCentreManagementQualificationDetails(): QualificationDetails[] {
        if (!this.data || !this.data.CentresData.QualificationDetails) {
            throw new Error(`${this.getAllCentreManagementQualificationDetails.name} : QualificationDetailsData is undefined`);
        };
        return this.data.CentresData.QualificationDetails;
    };

    getAllCentreManagementAdditionalRefereeDetails(): RefereeDetails[] {
        if (!this.data || !this.data.CentresData.AdditionalRefereeDetails) {
            throw new Error(`${this.getAllCentreManagementAdditionalRefereeDetails.name} : AdditionalRefereeDetailsData is undefined`);
        };
        return this.data.CentresData.AdditionalRefereeDetails;
    };

    getAllCentreManagementFeePaymentOptionDetails(): FeePaymentMethodDetails[] {
        if (!this.data || !this.data.CentresData.FeePaymentMethodDetails) {
            throw new Error(`${this.getAllCentreManagementFeePaymentOptionDetails.name} : FeePaymentOptionDetailsData is undefined`);
        };
        return this.data.CentresData.FeePaymentMethodDetails;
    };

    getAllCentreManagementBuzzwordDetails(): BuzzwordDetails {
        if (!this.data || !this.data.CentresData.BuzzwordDetails) {
            throw new Error(`${this.getAllCentreManagementBuzzwordDetails.name} : BuzzwordDetailsData is undefined`);
        };
        return this.data.CentresData.BuzzwordDetails;
    };

    getAllCentreManagementReferenceTemplateTextDetails(): ReferenceTemplateTextDetails {
        if (!this.data || !this.data.CentresData.ReferenceTemplateTextDetails) {
            throw new Error(`${this.getAllCentreManagementReferenceTemplateTextDetails.name} : ReferenceTemplateTextDetailsData is undefined`);
        };
        return this.data.CentresData.ReferenceTemplateTextDetails;
    };

    getAllCentreManagementCentreDetails(): CentreDetails {
        if (!this.data || !this.data.CentresData.CentreDetails) {
            throw new Error(`${this.getAllCentreManagementCentreDetails.name} : CentreDetailsData is undefined`);
        };
        return this.data.CentresData.CentreDetails;
    };

    getAllCentreManagementCentreDetailsDataUpdatesUKAddresses(): UkAddress[] {
        if (!this.data || !this.data.CentresData.CentreDetails.DataUpdates.UKAddresses) {
            throw new Error(`${this.getAllCentreManagementCentreDetailsDataUpdatesUKAddresses.name} : CentreDetailsDataUpdatesUKAddressesData is undefined`);
        };
        return this.data.CentresData.CentreDetails.DataUpdates.UKAddresses;
    };

    getAllCentreManagementCentreDetailsDataUpdatesNonUKAddresses(): NonUKAddress[] {
        if (!this.data || !this.data.CentresData.CentreDetails.DataUpdates.NonUKAddresses) {
            throw new Error(`${this.getAllCentreManagementCentreDetailsDataUpdatesNonUKAddresses.name} : CentreDetailsDataUpdatesNonUKAddressesData is undefined`);
        };
        return this.data.CentresData.CentreDetails.DataUpdates.NonUKAddresses;
    };

    getAllCentreManagementCentreDetailsDataUpdatesEmailAddresses(): string[] {
        if (!this.data || !this.data.CentresData.CentreDetails.DataUpdates.EmailAddresses) {
            throw new Error(`${this.getAllCentreManagementCentreDetailsDataUpdatesEmailAddresses.name} : CentreDetailsDataUpdatesEmailAddressesData is undefined`);
        };
        return this.data.CentresData.CentreDetails.DataUpdates.EmailAddresses;
    };

    getAllCentreManagementCentreDetailsDataUpdatesTelephoneNumbers(): string[] {
        if (!this.data || !this.data.CentresData.CentreDetails.DataUpdates.TelephoneNumbers) {
            throw new Error(`${this.getAllCentreManagementCentreDetailsDataUpdatesTelephoneNumbers.name} : CentreDetailsDataUpdatesTelephoneNumbersData is undefined`);
        };
        return this.data.CentresData.CentreDetails.DataUpdates.TelephoneNumbers;
    };

    getAllCentreManagementCentreDetailsDataUpdatesDatesUnavailable(): string[] {
        if (!this.data || !this.data.CentresData.CentreDetails.DataUpdates.DatesUnavailable) {
            throw new Error(`${this.getAllCentreManagementCentreDetailsDataUpdatesDatesUnavailable.name} : CentreDetailsDataUpdatesDatesUnavailableData is undefined`);
        };
        return this.data.CentresData.CentreDetails.DataUpdates.DatesUnavailable;
    };

    getAllStudentHubActivityDetails(): StudentHubActivityDetails {
        if (!this.data || !this.data.StudentHubActivityDetails) {
            throw new Error(`${this.getAllStudentHubActivityDetails.name}) : StudentHubActivityDetailsData is undefined`);
        };
        return this.data.StudentHubActivityDetails;
    };

};