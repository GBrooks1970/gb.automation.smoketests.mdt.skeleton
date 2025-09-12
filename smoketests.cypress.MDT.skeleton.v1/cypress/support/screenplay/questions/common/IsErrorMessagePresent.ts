export class IsErrorMessagePresent {

  private expectedErrorMessage: string;
  private elementSelector: string;
  constructor(expectedErrorMessage: string, elementSelector: string) {
    this.expectedErrorMessage = expectedErrorMessage;
    this.elementSelector = elementSelector;
  }

  answeredBy() {
    cy.log(`Retreiving error message`);
    cy.get(this.elementSelector)
      .invoke('text')
      .then((errorMessage) => {
        expect((errorMessage).replace(/\s+/g, ' ').trim()).to.contain(this.expectedErrorMessage);
      });
  }
}