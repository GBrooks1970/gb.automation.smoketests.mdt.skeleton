import { UCAS } from "../../../utils/UCAS-consts";

export class QueryCurrentURL {
    options = UCAS.urlOptions;
    constructor(urlTimeout: number = UCAS.urlTimeout) {
        this.options = { timeout: urlTimeout };
    }
    answeredBy() {
        cy.log(`Obtaining current URL`)
        return cy.url(this.options);
    };
};