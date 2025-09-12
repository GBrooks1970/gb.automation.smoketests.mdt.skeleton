import { UCAS } from "../../utils/UCAS-consts";

let predictiveEntryWait = 1000

export class Select {
    static Dropdown(selector: string, selection: string, options: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.get(selector, options).then($dropdown => {
                    const optionToSelect = $dropdown.find('option').filter((index, option) => {
                        return Cypress.$(option).text().trim() === selection;
                    });
                    const optionValue = optionToSelect.val();
                    if (optionValue === undefined) {
                        throw new Error(`Dropdown option with visible text "${selection}" not found for selector "${selector}"`);
                    };

                    cy.wrap($dropdown).select(optionValue as string, { force: true });
                });
            },
        };
    };

    static TopazDropdown(selector: string, selection: string, options: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.get(selector, options).select(selection, { force: true });
            },
        };
    };

    static RadioButton(selector: string) {
        return {
            performAs: () => {
                cy.get(selector).click({ force: true });
            },
        };
    };

    static PredictiveEntry(fieldSelector: string, predictiveEntrySelector: string, value: string, clearField: boolean = false, options: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.wait(predictiveEntryWait);
                if (clearField === true) {
                    cy.get(fieldSelector, options).clear().type(value);
                } else {
                    cy.get(fieldSelector, options).type(value);
                };
                cy.wait(predictiveEntryWait);
                cy.get(predictiveEntrySelector, options).contains(value).click();
            },
        };
    };
};

export class Field {
    static Fill(selector: string, value: string, options: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.get(selector, options).type(value);
            },
        };
    };

    static Clear(selector: string, option: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.get(selector, option).clear();
            },
        };
    };
};

export class Button {
    static Click(selector: string, options: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.get(selector, options).click(options);
            },
        };
    };

    static ClickContains(selector: string, content: string = '', options: any = UCAS.getOptions) {
        return {
            performAs: () => {
                cy.get(selector, options).contains(content, options).click(options);
            },
        };
    };
};