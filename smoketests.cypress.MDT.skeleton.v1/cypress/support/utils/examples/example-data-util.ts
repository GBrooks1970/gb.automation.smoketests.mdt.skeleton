import exampleData from '../../../fixtures/example-data.json';
import { ChildComplexData, Detail, ExampleData, ParentComplexData, Place, Qualification } from './example-data';

export class ExampleDataUtil {
    private data?: ExampleData;
    private fixtureFileName?: string;

    constructor(fixtureName?: string) {
        this.data = ExampleDataUtil.LoadExampleData();
    };

    static LoadExampleData(): ExampleData {
        return exampleData as ExampleData;
    };

    getEnvName(): string {
        if (!this.data) {
            throw new Error(`${this.getEnvName.name} : Data is undefined`);
        };
        return this.data.envName;
    }

    getParentComplexData(): ParentComplexData {
        if (!this.data || !this.data.parentComplexData) {
            throw new Error(`${this.getParentComplexData.name} : ParentComplexData is undefined`);
        };
        return this.data.parentComplexData;
    }

    getChildComplexData(): ChildComplexData {
        const complexData = this.getParentComplexData();
        if (!this.data || !complexData.childComplexData) {
            throw new Error(`${this.getChildComplexData.name} : ChildComplexData is undefined`);
        };
        return complexData.childComplexData;
    }

    getAllDetails(): Detail[] {
        const complexData = this.getChildComplexData();
        if (!this.data || !complexData.details) {
            throw new Error(`${this.getAllDetails.name} : Details is undefined`);
        };
        return complexData.details;
    };

    getAllPlaces(): Place[] {
        const complexData = this.getChildComplexData();
        if (!this.data || !complexData.places) {
            throw new Error(`${this.getAllDetails.name} : Places is undefined`);
        };
        return complexData.places;
    };    

    getAllQualifications(): Qualification[] {
        const complexData = this.getChildComplexData();
        if (!this.data || !complexData.Qualifications) {
            throw new Error(`${this.getAllDetails.name} : Qualifications is undefined`);
        };
        return complexData.Qualifications;
    };
}