import { User } from "../../actors/User";

const toastMessageSelector = '.message--content';
const persistentToastMessageTimeout = 15000;

export class IsPersistentToastMessagePresent {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    usingMessage(expectedMessage: string) {    
        return { 
            answeredBy: () => {
                cy.get(toastMessageSelector, {timeout: persistentToastMessageTimeout}).invoke("text").should("equal", expectedMessage);        
            },   
        };
    };
};    