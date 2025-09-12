import { User } from "cypress/support/screenplay/actors/User";
import { Navigation } from "../interactions/Navigation";

export class navigateTo_Base {
    user: User;
    nav: Navigation;
    constructor(user: User, nav?: Navigation) {
        this.user = user;
        if (nav) {
            this.nav = nav;
        } else {
            this.nav = new Navigation();
        };
    };

    performAs() {
        cy.log('EMPTY Navigating to  - PLEASE IMPLEMENT');
    };
}
