import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from "cypress/support/utils/common-utils";

let fixedURL: string = "https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub"; // Replace with a valid URL for testing
let url: string;
let gridOutput: string[] = [];
let errorMessage: string | null = null;

Given("a valid URL {string}", (inputUrl: string) => {
    url = inputUrl;
});

Given("a valid URL is fixedURL", (inputUrl: string) => {
    url = fixedURL;
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