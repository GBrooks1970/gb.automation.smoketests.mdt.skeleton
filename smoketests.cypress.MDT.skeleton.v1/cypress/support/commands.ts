/// <reference types="cypress" />

import Bluebird from "cypress/types/bluebird";
import { isElement } from "cypress/types/lodash";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
//indicate that the file is a module:
export { };

// Implement the custom command
Cypress.Commands.add('waitForElementToDisappear', (selector, timeout = 10000) => {
  cy.waitUntil(() => cy.get(selector).then($el => $el.is(':hidden')), {
    errorMsg: `The element ${selector} did not disappear in time`,
    timeout: timeout,
    interval: 500,
  });
});


Cypress.Commands.add("isElementPresentWait", (selector: string, timeout = 5000) => {
  cy.waitUntil(() => {
    return cy.isElementPresent(selector);
  }
    , {
      errorMsg: `The element ${selector} did not become present in time`, // overrides the default error message
      timeout: timeout, // waits up to timeout ms, default to 5000
      interval: 500 // performs the check every 500 ms, default to 200
    });
});

Cypress.Commands.add('isElementPresent', (selector: string) => {
  return cy.get('body').then(($body) => {
    const elementFound = $body.find(selector).length > 0;

    if (elementFound) {
      cy.log(`Element '${selector}' : PRESENT `);
    } else {
      cy.log(`Element '${selector}' : NOT PRESENT `);
    }
    return cy.wrap(elementFound);
  })
});

declare global {
  namespace Cypress {
    interface Chainable {

      /**
     * Waits for an element with the given selector to not be visible on the page.
     * @param selector The CSS selector of the element to check.
     * @param timeout The maximum amount of time to wait.
     */
      waitForElementToDisappear(selector: string, timeout?: number): Chainable<Element>;

      isElementPresentWait(selector: string, timeout?: number): Chainable<boolean>;
      isElementPresent(_selector: string): Chainable<boolean>;
    }
  }
}

export { };