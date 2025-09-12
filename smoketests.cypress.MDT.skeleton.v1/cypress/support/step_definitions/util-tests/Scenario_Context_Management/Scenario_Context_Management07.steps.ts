import { Given, When, Then, Before, After, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { TopazUser } from "../../../screenplay/actors/TopazUser";
import { SignOutOfTopazAndWaitForFullProcess } from "cypress/support/screenplay/tasks/topaz/SignOutOfTopazAndWaitForFullProcess";
import { NavigateBackFromTopazErrorPage } from "cypress/support/screenplay/tasks/common/navigation/topaz/NavigateBackFromTopazErrorPage";
import { SignInToTopazAndWaitForFullProcess } from "cypress/support/screenplay/tasks/topaz/SignInToTopazAndWaitForFullProcess";
import { NavigateToTopazApplicationEnquiryPage } from "cypress/support/screenplay/tasks/common/navigation/topaz/NavigateToTopazApplicationEnquiryPage";
import { DataMapper } from "cypress/support/utils/DataMapper";
import MappingUtils from "cypress/support/utils/MappingUtils";
import { TopazApplicant } from "cypress/support/utils/env/TopazData_TopazApplicant";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";
import CommonUtils from "cypress/support/utils/common-utils";
import { generateRandomTopazApplicant, generateRandomTopazApplicantProfile } from "cypress/support/utils/TestDataObjects/DataGenerator/DataGenerator_TopazApplicant";
import { TestData_TopazApplicant_Empty } from "cypress/support/utils/TestDataObjects/TestData_TopazApplicant_Empty";
import { TOPAZ_PROC_A_USER } from "cypress/support/utils/TestDataObjects/TOPAZ_PROC_A_USER";


let envData = new EnvDataUtil();
let topazUser = TOPAZ_PROC_A_USER;

let scenarioTopazApplicant: TopazApplicant = TestData_TopazApplicant_Empty;

let flattenedTopazApplicantSearchDetails_v1: Record<string, any>;
let flattenedTopazApplicantSearchDetails_v2: Record<string, any>;

let recordData: Record<string, string>;
let flattenedTopazApplicant: Record<string, any>;
let TopazApplicantSearchDetails: Record<string, any>;
let mappedRecordData: any[] = [];

let counter: number = 0;

Given("I have a TOPAZ registered Valid user that is signed in - scenario_context_TOPAZ", () => {
    //topazUser.attemptsTo(new SignInToTopazAndWaitForFullProcess(topazUser));
});

Given("the User Navigates to the Topaz Application Enquiry Page - scenario_context_TOPAZ", () => {
    //topazUser.attemptsTo(new navigateToTopazApplicationEnquiryPage(topazUser));
});

function filterBySchemeFn(f: string): ((member: unknown) => boolean) | undefined {
    return (m) => (m as TopazApplicant).Scheme === f;
};

Given("the User Enquires About an Existing Application - scenario_context_TOPAZ", (dataTable: DataTable) => {

    const globalData = ScenarioUtils.getGlobalTestData();
    const context = ScenarioUtils.getCurrentTopazScenarioContextByTag();
    const scenarioTag = ScenarioUtils.getCurrentScenarioTag();
    expect(context).to.exist;

    recordData = dataTable.hashes()[0];
    
    // testing the datapicker withing the scenario context - so log the relevant topaz applicant details
    console.log(`${scenarioTag}: recordData: ${CommonUtils.toJSONString(recordData, { unformatted: false })}`);    
    console.log(`${scenarioTag}: recordData Scheme: ${CommonUtils.toJSONString(recordData['Scheme'], { unformatted: false })}`);

    if (context
        && context.setup
        && context.dataPickerUtil
    ) {
        counter = counter + 1;
        console.log(`${counter} : Updating the TopazApplicant for the scenario context - scenario_context_TOPAZ`);
        context.TopazApplicant = context.dataPickerUtil?.getRandomMemberWithoutRepetition(filterBySchemeFn(recordData['Scheme']));
        globalData.Topaz_Scenario_context[scenarioTag] = context;
    };

    ScenarioUtils.setGlobalTestData(globalData);

    expect(context.TopazApplicant).to.exist;
    scenarioTopazApplicant = context.TopazApplicant ?? generateRandomTopazApplicant(true);

    console.log(`${scenarioTag} scenarioTopazApplicant PID: ${CommonUtils.toJSONString(scenarioTopazApplicant?.PID)}`);
    console.log(`${scenarioTag} scenarioTopazApplicant Scheme: ${CommonUtils.toJSONString(scenarioTopazApplicant?.Scheme)}`);
    console.log(`${scenarioTag} scenarioTopazApplicant Profile: ${CommonUtils.toJSONString(scenarioTopazApplicant?.Profile)}`);


});

Then("the Applicant Returned Has the Expected Details - scenario_context_TOPAZ", () => {
    // Commented out becasue we are testing the datapicker withing the scenario context

    // topazUser.asks(new Is_TopazData_ApplicantDetails(topazUser).SearchResultsDisplayedCorrectly(flattenedTopazApplicantSearchDetails_v1));
});

Then("FINALLY the User signs out - scenario_context_TOPAZ", () => {
    // Commented out becasue we are testing the datapicker withing the scenario context

    // topazUser.attemptsTo(new SignOutOfTopazAndWaitForFullProcess(topazUser));
});

Then("FINALLY the User signs out from the Error Page - scenario_context_TOPAZ", () => {
    // Commented out becasue we are testing the datapicker withing the scenario context

    // topazUser.attemptsTo(new NavigateBackFromTopazErrorPage(topazUser));
    // topazUser.attemptsTo(new SignOutOfTopazAndWaitForFullProcess(topazUser));
});
