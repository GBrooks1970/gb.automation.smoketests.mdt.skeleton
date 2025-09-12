import { GlobalTestData, scenario_context, scenario_context_topaz } from "./scenario_context";

export class ScenarioUtils {
    constructor() { };

    /**
 * Retrieves the global test data from Cypress environment
 * @returns {GlobalTestData} - The global test data
 */
    static getGlobalTestData = (): GlobalTestData => {
        return Cypress.env("globalTestData") as GlobalTestData;
    };

    /**
     * Updates the global test data in Cypress environment
     * @param {GlobalTestData} data - The updated global test data
     */
    static setGlobalTestData = (data: GlobalTestData): void => {
        Cypress.env("globalTestData", data);
    };

    /**
     * Retrieves the current scenario title being executed.
     * @returns {string} - The current scenario title
     */
    static getCurrentScenarioTitle = (): string => {
        cy.log(`Scenario: ${Cypress.currentTest.title} `);
        return Cypress.currentTest.title;
    };

    /**
     * Retrieves the current scenario tag being executed.
     * @returns {string} - The current scenario tag
     */
    static getCurrentScenarioTag = (): string => {
        const tagRegex = /^(?<tag>.*?)\s* - \s*(?<desc>.*)$/
        const match = tagRegex.exec(Cypress.currentTest.title);
        if (!match || !match.groups) {
            throw new Error(`${this.getCurrentScenarioTag.name} : Tag not present in Scenario Tilte: ${Cypress.currentTest.title}`);
        }
        cy.log(`Scenario Tag: ${match.groups['tag']}`);
        return match.groups['tag'];
    };

    /**
     * Retrieves details of the current test being executed.
     * @returns {object} - Object containing test properties
     */
    static getCurrentTestDetails = (): Record<string, any> => {
        let testDetails = {
            title: Cypress.currentTest.title,
            titlePath: Cypress.currentTest.titlePath,
        };
        cy.log(`Test Details: ${JSON.stringify(testDetails)}`);
        return testDetails;
    };

    /**
     * Retrieves the current scenario context (Topaz) by tag being executed.
     * @returns {object} - The current scenario context 
     */
    static getCurrentTopazScenarioContextByTag = (): scenario_context_topaz<any> => {
        const globalData = ScenarioUtils.getGlobalTestData();
        const scenarioTag = ScenarioUtils.getCurrentScenarioTag();
        const context = globalData.Topaz_Scenario_context[scenarioTag];
        cy.log(`Scenario_context(Topaz): ${JSON.stringify(context)}`);
        return context;
    };

    /**
     * Retrieves the current scenario context (Topaz) by supplied key.
     * @returns {object} - The current scenario context 
     */
    static getCurrentTopazScenarioContext = (key: string): scenario_context_topaz<any> => {
        const globalData = ScenarioUtils.getGlobalTestData();
        const context = globalData.Topaz_Scenario_context[key];
        cy.log(`Scenario_context(Topaz): ${JSON.stringify(context)}`);
        return context;
    };

    /**
     * Retrieves the current scenario context by tag being executed.
     * @returns {object} - The current scenario context 
     */
    static getCurrentScenarioContextByTag = (): scenario_context<any> => {
        const globalData = ScenarioUtils.getGlobalTestData();
        const scenarioTag = ScenarioUtils.getCurrentScenarioTag();
        const context = globalData.Scenario_context[scenarioTag];
        cy.log(`Scenario_context: ${JSON.stringify(context)}`);
        return context;
    };

    /**
     * Retrieves the current scenario context by supplied key.
     * @returns {object} - The current scenario context 
     */
    static getCurrentScenarioContext = (key: string): scenario_context<any> => {
        const globalData = ScenarioUtils.getGlobalTestData();
        const context = globalData.Scenario_context[key];
        cy.log(`Scenario_context: ${JSON.stringify(context)}`);
        return context;
    };


    /**
     * Retrieves all Current tags from the current test being executed in Cypress.
     *
     * @returns {string[]} - An array of tags associated with the scenario.
     * @throws {Error} - If no tags are found in the scenario.
     */
    static getCurrentCurrentTestTags = (): string[] => {
        const globalData = ScenarioUtils.getGlobalTestData();
        const tags = globalData.tags;
        cy.log(`Current Test tags: ${JSON.stringify(tags)}`);
        return tags; // Return the extracted tags array
    };
    
}
