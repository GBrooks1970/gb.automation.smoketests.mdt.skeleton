import { Before } from "@badeball/cypress-cucumber-preprocessor";
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { DataPickerUtil } from "cypress/support/utils/DataPickerUtil";
import { ScenarioUtils } from "cypress/support/screenplay/core/ScenarioUtils";
import { generateRandomTopazApplicant } from "cypress/support/utils/TestDataObjects/DataGenerator/DataGenerator_TopazApplicant";
import { TOPAZ_PROC_A_USER } from "cypress/support/utils/TestDataObjects/TOPAZ_PROC_A_USER";

let envData = new EnvDataUtil();
let topazUser = TOPAZ_PROC_A_USER;

Before({ tags: "@runBeforeHook_Scenario_Context_Management_AA_001" }, () => {
    console.log("Before - @runBeforeHook_Scenario_Context_Management_AA_001");
    const globalData = ScenarioUtils.getGlobalTestData();
    const scenarioTitle = ScenarioUtils.getCurrentScenarioTitle();
    const scenarioTag = ScenarioUtils.getCurrentScenarioTag();
    console.log(`Scenario: ${scenarioTitle} `);

    let context = ScenarioUtils.getCurrentTopazScenarioContextByTag();

    if (!context) {
        console.log(`Scenario : ${scenarioTitle} : Running initial setup step. runBeforeHook_Scenario_Context_Management_AA_001...`);

        let datatPicker = new DataPickerUtil(
            envData.topazData.getAllTopazApplicantDetails()
        );
        context = {
            setup: false,
            User: topazUser,
            dataPickerUtil: datatPicker,
            TopazApplicant: undefined
        };
         
        globalData.Topaz_Scenario_context[scenarioTag] = context;
    }

    if (context 
        && !context.setup 
    ) {
        console.log(`Scenario : ${scenarioTitle} : Running initial setup step. ADDING CONTEXT.`);
        context.setup = true;
        context.TopazApplicant = generateRandomTopazApplicant(true);            
        globalData.Topaz_Scenario_context[scenarioTag] = context;
    };

    ScenarioUtils.setGlobalTestData(globalData);
    
    // console.log(`${scenarioTag}_currentPick PID: ${CommonUtils.toJSONString(globalData.Topaz_Scenario_context[scenarioTag].TopazApplicant?.PID)}`);
    // console.log(`${scenarioTag}_currentPick Scheme: ${CommonUtils.toJSONString(globalData.Topaz_Scenario_context[scenarioTag].TopazApplicant?.Scheme)}`);
    // console.log(`${scenarioTag}_currentPick Profile: ${CommonUtils.toJSONString(globalData.Topaz_Scenario_context[scenarioTag].TopazApplicant?.Profile)}`);
});