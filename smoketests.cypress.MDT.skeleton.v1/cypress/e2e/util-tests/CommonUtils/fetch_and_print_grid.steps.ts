import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "../../../support/utils/common-utils";

let url: string;
let gridOutput: string[] = [];
let errorMessage: string | null = null;

Given("a valid URL {string}", (inputUrl: string) => {
    url = inputUrl;
});

When("I fetch and parse the grid from the table", () => {
    cy.wrap(
        CommonUtils.fetchAndPrintGridFromTable(url)
            .then(output => {
                gridOutput = output;
                errorMessage = null;
            })
            .catch(err => {
                gridOutput = [];
                errorMessage = err;
            })
    );
});

Then("the grid should be printed as:", (expectedGrid: string) => {
    const expectedOutput = expectedGrid.trim().split('\n');
    expect(gridOutput).to.deep.equal(expectedOutput);
});

Then("an error message {string} should be displayed", (expectedErrorMessage: string) => {
    expect(errorMessage).to.equal(expectedErrorMessage);
});