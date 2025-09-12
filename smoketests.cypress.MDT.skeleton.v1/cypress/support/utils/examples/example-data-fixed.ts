import { Detail, ParentComplexData, Place, Qualification } from "../examples/example-data";
import { ExampleDataUtil } from "../examples/example-data-util";


export const exampleParentComplexData: ParentComplexData =
    (new ExampleDataUtil()).getParentComplexData();

const details: Detail[] = [
    {
        detailId: "0001",
        minor: "minor001",
        major: "major001"
    },
    {
        detailId: "0002",
        minor: "minor002",
        major: "major002"
    },
    {
        detailId: "0003",
        minor: "minor003",
        major: "major003"
    },
    {
        detailId: "0004",
        minor: "minor004",
        major: "major004"
    }
];

const Qualifications: Qualification[] = [
    {
        Name: "name001",
        grades: "[pass|fail]"
    },
    {
        Name: "name002",
        grades: "[pass|fail]"
    },
    {
        Name: "name003",
        grades: "[pass|fail]"
    }
];

const places: Place[] = [
    {
        PlaceId: "0001",
        Country: "country001",
        City: "city001"
    },
    {
        PlaceId: "0002",
        Country: "country002",
        City: "city002"
    },
    {
        PlaceId: "0003",
        Country: "country002",
        City: "city003"
    }
];

export const exampleParentComplexData1: ParentComplexData =
{
    childComplexData:
    {
        details: details,
        places: places,
        Qualifications: Qualifications
    }
};