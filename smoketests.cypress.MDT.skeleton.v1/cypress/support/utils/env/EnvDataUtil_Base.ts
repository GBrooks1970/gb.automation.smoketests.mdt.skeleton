import { EnvironmentData, Endpoints } from './EnvironmentData';
import environmentData from '../../../fixtures/env-data.json'
import { EnvDataUtil_ApplyData } from './EnvDataUtil_ApplyData';
import { EnvDataUtil_AdviserPortalData } from './EnvDataUtil_AdviserPortalData';
import { EnvDataUtil_EmployerData } from './EnvDataUtil_EmployerData';
import { EnvDataUtil_TopazData } from './EnvDataUtil_TopazData';

export class EnvDataUtil_Base {
    protected data: EnvironmentData;

    constructor() {
        this.data = EnvDataUtil_Base.LoadFixtureData();
        this.data.Apply = EnvDataUtil_ApplyData.LoadFixtureData();
        this.data.AdviserPortal = EnvDataUtil_AdviserPortalData.LoadFixtureData();
        this.data.Employer = EnvDataUtil_EmployerData.LoadFixtureData();
        this.data.Topaz = EnvDataUtil_TopazData.LoadFixtureData();
    };

    static LoadFixtureData(): EnvironmentData {
        return environmentData as EnvironmentData 
    };

    getEnvName(): string {
        if (!this.data) {
            throw new Error(`${this.getEnvName.name} : Data is undefined`);
        };
        return this.data.envName;
    };

    getEndpoint(key: keyof Endpoints): any {
        if (!this.data) {
            throw new Error(`${this.getEndpoint.name} : Data is undefined`);
        };
        return this.data.endpoints[key];
    };
};