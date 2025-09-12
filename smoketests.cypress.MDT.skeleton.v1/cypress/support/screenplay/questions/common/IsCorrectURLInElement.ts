import { User } from "../../actors/User";

export class IsCorrectURLInElement {
  user: User;
  constructor(user: User) {
    this.user = user;
  };

  usingString (expectedURL: string, elementSelector: string) {
    return {
      answeredBy() {
        cy.log(`Verifying URL in element`);
        cy.get(elementSelector).invoke('attr', 'href').then((elementURL) => {
          expect(elementURL).to.equal(expectedURL); // Compare actual and expected URLs
        });
      },
    };
  };

  usingVacancyDetails (data: any, elementSelector: string) {
    return {
      answeredBy() {
        cy.log(`Verifying URL in element`);
        cy.get(elementSelector).invoke('attr', 'href').then((elementURL) => {
          expect(elementURL).to.equal(data.url); // Compare actual and expected URLs
        });
      },
    };
  };
};