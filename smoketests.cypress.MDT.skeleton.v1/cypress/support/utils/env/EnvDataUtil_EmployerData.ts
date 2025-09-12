import { EmployerData, VacancyDetails } from "./EmployerData";
import employerEnvironmentData from '../../../fixtures/env-data_Employer.json'

export class EnvDataUtil_EmployerData {
    protected data?: EmployerData;

    constructor() {
        this.data = EnvDataUtil_EmployerData.LoadFixtureData();
    };

    static LoadFixtureData(): EmployerData {
        return employerEnvironmentData as EmployerData;
    };

    getAllVacancyDetails(): VacancyDetails[] {
        if (!this.data || !this.data.vacancyDetails) {
            throw new Error(`${this.getAllVacancyDetails.name} : Vacancy Data is undefined`);
        };
        return this.data.vacancyDetails;
    };

    getVacancyDetailsByIndex(index: number): VacancyDetails {
        if (!this.data || !this.data.vacancyDetails) {
            throw new Error(`${this.getAllVacancyDetails.name} : Users Data is undefined`);
        };
        // Check if the index is within the bounds of the array
        if (index < 0 || index >= this.data.vacancyDetails.length) {
            throw new Error(`Index out of bounds: ${index}`);
        };
        return this.data.vacancyDetails[index];
    };

    getRandomVacancyDetails(): VacancyDetails {
        const allVacancyDetails = this.getAllVacancyDetails();
        const randomIndex = Math.floor(Math.random() * allVacancyDetails.length);
        return allVacancyDetails[randomIndex];
    };
};