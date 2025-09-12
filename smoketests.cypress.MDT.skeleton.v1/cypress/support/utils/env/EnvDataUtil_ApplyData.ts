import { SymbolsDT, SymbolsOBS }from "../symbol-consts";
import { ApplyData, ContactAndResidencyData, EducationData, EducationDetails, EDQualification, PlaceOfEducation } from "./ApplyData";
import applyEnvironmentData from '../../../fixtures/env-data_Apply.json'

export class EnvDataUtil_ApplyData {
    protected data?: ApplyData;

    constructor() {
        this.data = EnvDataUtil_ApplyData.LoadFixtureData();
    };

    static LoadFixtureData(): ApplyData {
        return applyEnvironmentData as ApplyData;
    };
     
    getApplyData(): ApplyData {
        if (!this.data) {
            throw new Error(`${this.getApplyData.name} : Apply Data is undefined`);
        };
        return this.data;
    };

    getEducationData(): EducationData {
        if (!this.data || !this.data.EducationData) {
            throw new Error(`${this.getEducationData.name} : Education Data is undefined`);
        };
        return this.data.EducationData;
    };
    
    getAllContactAndResidencyData(): ContactAndResidencyData[] {
        if (!this.data || !this.data.ContactAndResidencyData) {
            throw new Error(`${this.getAllContactAndResidencyData.name} : ContactAndResidencyData Data is undefined`);
        };
        return this.data.ContactAndResidencyData;
    };

    getAllPlacesOfEducation(): PlaceOfEducation[] {
        const educationData = this.getEducationData();

        if (!this.data || !educationData.PlacesOfEducation) {
            throw new Error(`${this.getAllPlacesOfEducation.name} : PlacesOfEducation Data is undefined`);
        };
        return educationData.PlacesOfEducation;
    };

    getRandomPlaceOfEducation(): PlaceOfEducation {
        const allPlacesOfEducation = this.getAllPlacesOfEducation();
        const randomIndex = Math.floor(Math.random() * allPlacesOfEducation.length);

        return allPlacesOfEducation[randomIndex];
    };

    
    getAllEducationDetails(): EducationDetails[] {
        const educationData = this.getEducationData();

        if (!this.data || !educationData.EducationDetails) {
            throw new Error(`${this.getAllEducationDetails.name} : EducationDetails Data is undefined`);
        };
        return educationData.EducationDetails;
    };

    getEducationDetailsByULN(ULN: string): EducationDetails {
        const allEducationDetails = this.getAllEducationDetails();
        const educationDetails = allEducationDetails.find(educationDetails =>  educationDetails.ULN === ULN);

        if (!educationDetails) {
            throw new Error(`PlaceOfEducation Data does not contain data where ULN is "${ULN}"`);
        };
        return educationDetails;
    };

    getRandomEducationDetails(): EducationDetails {
        const allEducationDetails = this.getAllEducationDetails();
        const randomIndex = Math.floor(Math.random() * allEducationDetails.length);
        const educationDetails = allEducationDetails[randomIndex];

        return educationDetails;
    };

    getAllPOEQualifications(): any[] {
        const educationData = this.getEducationData();

        if (!this.data || !educationData.EDQualifications) {
            throw new Error(`${this.getAllPOEQualifications.name} : poeQualifications Data is undefined`);
        };
        return educationData.EDQualifications;
    };

    getAllType1QualificationsWithNoModules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allPOEQualifications = this.getAllPOEQualifications();
        const filteredPOEQualifications = allPOEQualifications.filter(poeQualifications =>
            poeQualifications.QualName &&
            poeQualifications.QualDate !== SymbolsDT.IGNORE &&
            poeQualifications.Grade &&
            !poeQualifications.Modules &&
             // Assert that no other field details exist
            Object.keys(poeQualifications).every(key =>
                ['QualName', 'QualDate', 'Grade', 'Modules'].includes(key)
            )
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data for Type1Qualification where no Modules exist`);
        };
        return filteredPOEQualifications;
    };

    getRandomType1QualificationWithNoModules(): EDQualification {
        // Type is a placeholder until we gather actual qualification type names
        const allType1QualificationsWithNoModules = this.getAllType1QualificationsWithNoModules();
        const randomIndex = Math.floor(Math.random() * allType1QualificationsWithNoModules.length);
        const selectedPOEQualification = allType1QualificationsWithNoModules[randomIndex];

        return selectedPOEQualification;
    };

    getAllType1QualificationsWithModules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allPOEQualifications = this.getAllPOEQualifications();
        const filteredPOEQualifications = allPOEQualifications.filter(poeQualifications =>
            poeQualifications.name &&
            poeQualifications.ModuleDate !== SymbolsDT.IGNORE &&
            poeQualifications.Grade &&
            poeQualifications.Modules
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data for Type1Qualfication with Modules`);
        };
        return filteredPOEQualifications;
    };

    getAllType1QualificationsWithType1Modules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allType1POEQualificationsWithModules = this.getAllType1QualificationsWithModules();
        const filteredPOEQualifications = allType1POEQualificationsWithModules.filter(poeQualification =>
            poeQualification.Modules?.every(module =>
                module.ModuleTitle &&
                module.ModuleDate !== SymbolsDT.IGNORE &&
                module.Grade
            )
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data where all Modules have valid titles and marks for a Type1Module`);
        };
        return filteredPOEQualifications;
    };

    getAllType1QualificationsWithAtLeast2Type1Modules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allType1QualificationsWithType1Modules = this.getAllType1QualificationsWithType1Modules();
        const filteredPOEQualifications = allType1QualificationsWithType1Modules.filter(poeQualification =>
            poeQualification.Modules?.length &&
            poeQualification.Modules.length >= 2
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data where two or more Type1 Modules exist on a Type 1 Qualification`);
        };
        return filteredPOEQualifications;
    };

    getAllType1QualificationsWithType2Modules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allType1POEQualificationsWithModules = this.getAllType1QualificationsWithModules();
        const validType1ModuleSubject: string[] = ['Reading', 'Writing'];
        const validModuleMark: string[] = ["Pending", "A", "B", "C", "Fail", "Other"]
        const filteredPOEQualifications = allType1POEQualificationsWithModules.filter(poeQualification =>

            poeQualification.Modules?.every(module =>
                validType1ModuleSubject.includes(module.ModuleTitle) &&
                module.ModuleDate === SymbolsDT.IGNORE &&
                validModuleMark.includes(module.Grade) &&
                module.GradeOther
            )
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data where all Modules have valid titles and marks`);
        };
        return filteredPOEQualifications;
    };

    getRandomType1QualificationWithType2Modules(): EDQualification {
        // Type is a placeholder until we gather actual qualification type names
        const allType1QualificationsWithType2Modules = this.getAllType1QualificationsWithType2Modules();
        const randomIndex = Math.floor(Math.random() * allType1QualificationsWithType2Modules.length);
        const poeQualification = allType1QualificationsWithType2Modules[randomIndex];

        return poeQualification;
    };

    getAllType2QualificationsWithStandardValuesAndNoModules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allPOEQualifications = this.getAllPOEQualifications(); 
        const validType2AwardingBody: string[] = [`Edexcel`, `Other`];
        const validType2Grade: string[] = [`Pending`, `AC`, `AA`, `AB`, `Other`];
        const filteredPOEQualifications = allPOEQualifications.filter(poeQualifications =>
            poeQualifications.name &&
            poeQualifications.QualTitle &&
            validType2AwardingBody.includes(poeQualifications.AwardingBody) &&
            validType2Grade.includes(poeQualifications.Grade) && 
            !poeQualifications.Modules
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data for Type2Qualification where no Modules exist`);
        };
        return filteredPOEQualifications;
    };

    getAllType2QualificationsWithNonStandardGradeAndNoModules(): EDQualification[] {
        // Type is a placeholder until we gather actual qualification type names
        const allPOEQualifications = this.getAllPOEQualifications();
        const validType2AwardingBody: string[] = [`Edexcel`, `Other`];
        const validType2Grade: string[] = [`Pending`, `AC`, `AA`, `AB`, `Other`];
        const filteredPOEQualifications = allPOEQualifications.filter(poeQualifications =>
            poeQualifications.QualName &&
            poeQualifications.QualTitle &&
            validType2AwardingBody.includes(poeQualifications.AwardingBody) &&
            validType2Grade.includes(poeQualifications.Grade) &&
            poeQualifications.GradeOther &&
            !poeQualifications.Modules
        );

        if (filteredPOEQualifications.length < 1) {
            throw new Error(`POEQualifications Data does not contain data for Type2Qualification where no Modules exist`);
        };
        return filteredPOEQualifications;
    };

    getRandomType2QualificationsWithNonStandardGradeAndNoModules(): EDQualification {
        const allType2QualificationsWithNoModules = this.getAllType2QualificationsWithNonStandardGradeAndNoModules();
        const randomIndex = Math.floor(Math.random() * allType2QualificationsWithNoModules.length);
        const poeQualification = allType2QualificationsWithNoModules[randomIndex];

        return poeQualification;
    };
};