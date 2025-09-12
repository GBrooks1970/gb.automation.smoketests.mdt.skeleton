import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";
import { DataMapper, NestedKeys } from "cypress/support/utils/DataMapper";
import { MoreAboutYouAndExtraActivities } from "cypress/support/utils/env/TopazData_TopazApplicant";
import { TopazApplicantOtherDetails } from "cypress/support/utils/env/TopazData_TopazApplicantOtherDetails";
import { TestData_MoreAboutYouAndExtraActivities_01 as TestData_MoreAboutYouAndExtraActivities } from "cypress/support/utils/TestDataObjects/TestData_MoreAboutYouAndExtraActivities_01";
import { TestData_topazApplicantOtherDetails_01 } from "cypress/support/utils/TestDataObjects/TestData_topazApplicantOtherDetails_01";

let inputObject: any;
let mappedObjectResult: any;
let inputArray: any[];
let inputFields: any[] = []; // Ensure inputFields is initialized as a string array
let inputKeyPrefix: string;
let method: string;
let moreAboutYouAndExtraActivities: MoreAboutYouAndExtraActivities;
let topazApplicantOtherDetails: TopazApplicantOtherDetails;
let flattenedResult: Record<string, any>;

Given("an input object:", (docString: string) => {
    inputObject = CommonUtils.parseJSON(docString);
    cy.log(`inputObject: ${CommonUtils.toJSONString(inputObject)}`);
    //Need an Array for mapArrayData
    inputArray = CommonUtils.parseJSON(docString);
    cy.log(`inputArray: ${CommonUtils.toJSONString(inputArray)}`);
});

Given("fields:", (fieldsString: string) => {
    // Parse and explicitly cast fields as a string array
    inputFields = fieldsString ? (CommonUtils.parseJSON(fieldsString) as string[]) : [];
    cy.log(`inputFields: ${CommonUtils.toJSONString(inputFields)}`);
});

Given("key prefix: {string}", (keyPrefix: string) => {
    inputKeyPrefix = keyPrefix;
    cy.log(`inputKeyPrefix: ${CommonUtils.toJSONString(inputKeyPrefix)}`);
});

When("I call the {string} method", (methodName: string) => {
    method = methodName;

    cy.log(`methodName(${method})`);
    switch (method) {
        case "mapArrayData":
            mappedObjectResult = DataMapper.mapArrayData(
                inputArray,
                inputKeyPrefix,
                inputFields,  // Explicitly cast to string[]
                true
            );
            break;
        case "mapAndflattenObjectData":
            mappedObjectResult = DataMapper.mapAndflattenObjectData(inputObject, inputKeyPrefix, true);//DataMapper.mapAndflattenObjectData(inputObject);
            break;
        case "mapArrayToIndexedObject":
            mappedObjectResult = DataMapper.mapArrayToIndexedObject(inputKeyPrefix, inputObject);
            break;
       
        default:
            throw new Error(`Unknown method: ${method}`);
    }
    cy.log(`mappedObjectResult(${method}): ${CommonUtils.toJSONString(mappedObjectResult)}`);
});

Then("the mapped and flattened input Object result should be:", (docString: string) => {
    const expectedmappedResult = CommonUtils.parseJSON(docString);
    cy.log(`expectedmappedResult: ${CommonUtils.toJSONString(expectedmappedResult)}`);
    expect(mappedObjectResult).to.deep.equal(expectedmappedResult);
});