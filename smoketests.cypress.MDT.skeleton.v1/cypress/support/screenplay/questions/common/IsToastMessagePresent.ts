import { User } from "../../actors/User";

const toastMessageSelector = '#toast-container > div > div';

export class IsToastMessagePresent {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    withCorrectMessage(expectedMessage: string) {    
        return { 
            answeredBy: () => {
                cy.get(toastMessageSelector).invoke("text").should("equal", expectedMessage);        
            },   
        };
    };
};