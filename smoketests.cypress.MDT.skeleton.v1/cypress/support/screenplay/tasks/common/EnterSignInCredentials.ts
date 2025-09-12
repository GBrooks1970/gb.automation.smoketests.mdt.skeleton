import { User } from '../../actors/User';
import { Button, Field, Select } from '../../interactions/DOM.interactions';

const SignInField = '#ucas-input-login';
const PasswordField = '#ucas-input-password';
const SignInBtn = '#gigya-login-form > section > div > div > div > div.form-item.form-item__actions > div > div > input';

const signInOutDomWait = 15000;

export class EnterSignInCredentials {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    performAs() {
        const email: string = this.user.userData.email;
        const password: string = this.user.userData.password;
        cy.log('Entering Credentials');
        this.user.attemptsTo(new EnterSignInCredentialsEmailAddress(this.user, email));
        this.user.attemptsTo(new EnterSignInCredentialsPassword(this.user, password));
    };
};

export class EnterSignInCredentialsEmailAddress {
    user: User;
    userEmailAddress: string = '';
    constructor(user: User, email: string = '') {
        this.user = user;
        this.userEmailAddress = email;
    };

    performAs() {
        cy.log('Entering EmailAddress');
        this.user.attemptsTo(Field.Clear(SignInField));
        this.user.attemptsTo(Field.Fill(SignInField, this.userEmailAddress, { timeout: signInOutDomWait }));
    };
};

export class EnterSignInCredentialsPassword {
    user: User;
    userPassword: string = '';
    constructor(user: User, password: string = '') {
        this.user = user;
        this.userPassword = password;
    };

    performAs() {
        cy.log('Entering Password');
        this.user.attemptsTo(Field.Clear(PasswordField));
        this.user.attemptsTo(Field.Fill(PasswordField, this.userPassword, { timeout: signInOutDomWait }));
    };
};

export class ClicksSignInBtn {
    user: User
    constructor(user: User) {
        this.user = user;
    };

    performAs() {
        cy.log('Click Sign In Button');
        this.user.attemptsTo(Button.Click(SignInBtn, { timeout: signInOutDomWait }));
    };
};

const userMenuBtn = '#global-user-menu-icon';
const signOutBtn = "#global-user-menu-panel > ul > li:nth-child(5)";

export class ClicksSignOutBtn {
    user: User;
    constructor(user: User) {
        this.user = user;
    };

    performAs() {
        cy.log("Atempting to sign-out by clicking menu button");
        // expand user menu
        cy.wait(signInOutDomWait).then(() => {
            cy.log("Atempting to click menu button");
            this.user.attemptsTo(Button.Click(userMenuBtn, { timeout: signInOutDomWait }));
        }).then(() => {
            cy.log("Atempting to click Sign out button");
            // click Sign out button
            this.user.attemptsTo(Button.ClickContains(signOutBtn, "Sign out", { timeout: signInOutDomWait, force: true }));
        });
    };
};