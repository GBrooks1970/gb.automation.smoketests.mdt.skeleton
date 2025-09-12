import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { Button, Field, Select } from '../../screenplay/interactions/DOM.interactions'

const elementWaitTimeout = 5000
const tAndCHelpTextBtn = '#gigya-register-form > div > div.text-with-toggle-help.text-with-toggle-help--small.text-with-toggle-help--inline > button'
const registerBtn = '#gigya-login-form > section > div > div > div > div.tabs__tab-container.tabs__tab-container--extra-minimal > a:nth-child(2)'

let elementPresence: boolean;

Given('I open the page {string}', (url: string) => {
  cy.visit(url);
});

Given('I select the Register button', () => {
  cy.get(registerBtn).click()
})

When('I check for the presence of element with selector {string}', (selector: string) => {
  cy.isElementPresent(selector).then(isPresent => {
    elementPresence = isPresent;
  });
});

When('I wait for the presence of an element with selector {string}', (selector: string) => {
  cy.isElementPresentWait(selector, elementWaitTimeout).then(isPresent => {
    elementPresence = isPresent;
  });
});

When('I select the Terms and Conditions Help Text', () => {
  cy.get(tAndCHelpTextBtn).click()
})

When('I unselect the Terms and Conditions Help Text', () => {
  cy.get(tAndCHelpTextBtn).click()
})

Then('the element with selector {string} will become hidden', (selector: string) => {
  cy.waitForElementToDisappear(selector, elementWaitTimeout)
});

Then('the element should be present', () => {
  expect(elementPresence).to.be.true;
});

Then('the element should not be present', () => {
  expect(elementPresence).to.be.false;
});
