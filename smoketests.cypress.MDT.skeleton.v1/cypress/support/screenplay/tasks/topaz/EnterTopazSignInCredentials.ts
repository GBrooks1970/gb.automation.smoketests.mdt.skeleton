import { TopazUser } from '../../actors/TopazUser';
import { Button, Field, Select } from '../../interactions/DOM.interactions';
const TopazSignInField = '#ms_accountInput';
const TopazPasswordField = '#ms_passwordInput';
const TopazSignInButton = "input[type='submit']";

export class EnterTopazSignInCredentials {
    topazUser: TopazUser;
    constructor(topazUser: TopazUser) {
        this.topazUser = topazUser;
    };

    performAs() {
        cy.log('Entering Credentials')
        this.topazUser.attemptsTo(Field.Fill(TopazSignInField, this.topazUser?.topazUserData?.username ?? ''));
        this.topazUser.attemptsTo(Field.Fill(TopazPasswordField, this.topazUser?.topazUserData?.password ?? ''));
    };
};

export class ClicksTopazSignInBtn {
    topazUser: TopazUser;
    constructor(topazUser: TopazUser) {
        this.topazUser = topazUser;
    };

    performAs() {
        cy.log('Click Sign In Button')
        this.topazUser.attemptsTo(Button.Click(TopazSignInButton));
    };
};