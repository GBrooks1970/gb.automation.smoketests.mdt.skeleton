import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { IsPageDisplayed, DoesCurrentURLInclude } from '../../questions/common/IsPageDisplayed';
import { User } from '../../actors/User';
import { UsertypeLandingPage } from "cypress/support/utils/env/UserInfoData";
import { DealWithCookiePopUp } from './DealWithCookiePopUp';
import { EnterSignInCredentials, ClicksSignInBtn } from './EnterSignInCredentials';
import { NavigateToSignInPage } from './navigation/NavigateToSignInPage';

let envDataG = new EnvDataUtil();
const LandingPageLoadingWait = 20000;

export class WaitForFullSignInAndRedirect {
    envData!: EnvDataUtil;
    user: User;
    constructor(user: User, envData: EnvDataUtil = envDataG) {
        this.user = user;
    };

    performAs() {
        //Give Gigya/Identity chance to fully sign-in
        //This takes a while (2 stage process)  
        cy.log('Waiting for Sign-in process to fully complete and landing page redirect');
        //Give landing page chance to fully load
        cy.wait(LandingPageLoadingWait).then(() => {
            cy.log("Assert user is indeed signed in, so we have a valid test");
            this.user.asks(new IsPageDisplayed(
                this.user,
                this.envData.users.getUsertypeLandingPage(this.user.userData.userType as keyof UsertypeLandingPage),
                LandingPageLoadingWait));
        });

        //wait until the element with the class blob-spinner is no longer visible
        //cy.waitForElementToDisappear('.blob-spinner');
    };
};

export class NavigateAndSignIn {
    envData!: EnvDataUtil;
    user: User;
    constructor(user: User, envData: EnvDataUtil = envDataG) {
        this.user = user;
    };
    performAs() {
        //The User navigates to the Sign-in Page
        this.user.attemptsTo(new NavigateToSignInPage(this.user));
        //The User selects \'Accept all\' on the Cookie Popup Dialog
        this.user.attemptsTo(new DealWithCookiePopUp(DealWithCookiePopUp.AcceptAll));
        //The User enters their credentials
        this.user.attemptsTo(new EnterSignInCredentials(this.user));
        //The User clicks the Sign-in button
        this.user.attemptsTo(new ClicksSignInBtn(this.user));
    };
};

export class SignInAndWaitForFullProcess {
    envData!: EnvDataUtil;
    user: User;
    constructor(user: User, envData: EnvDataUtil = envDataG) {
        this.user = user;
    };

    performAs() {
        this.user.attemptsTo(new NavigateAndSignIn(this.user, this.envData));
        this.user.attemptsTo(new WaitForFullSignInAndRedirect(this.user, this.envData));
    };
};