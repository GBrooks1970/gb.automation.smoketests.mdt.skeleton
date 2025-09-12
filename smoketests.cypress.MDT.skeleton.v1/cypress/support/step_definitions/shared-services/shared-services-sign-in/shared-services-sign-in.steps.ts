import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { EnvironmentData } from '../../../utils/env/EnvironmentData';
import { UsertypeLandingPage } from "cypress/support/utils/env/UserInfoData";
import { UserData, EmptyUserData } from "cypress/support/utils/env/UserData";
import CommonUtils from '../../../utils/common-utils';
import { NavigateToSignInPage } from "../../../screenplay/tasks/common/navigation/NavigateToSignInPage";
import { NavigateToSignOutPage } from '../../../screenplay/tasks/common/navigation/NavigateToSignOutPage';
import { DealWithCookiePopUp } from '../../../screenplay/tasks/common/DealWithCookiePopUp';
import { SignOutAndWaitForFullProcess } from '../../../screenplay/tasks/common/SignOutAndWaitForFullProcess';
import { ClicksSignInBtn, EnterSignInCredentials, EnterSignInCredentialsEmailAddress, EnterSignInCredentialsPassword } from '../../../screenplay/tasks/common/EnterSignInCredentials';
import { IsPageDisplayed, DoesCurrentURLInclude } from '../../../screenplay/questions/common/IsPageDisplayed';

let envData: EnvDataUtil = new EnvDataUtil();
let user: User;
let setupStepExecuted = false; // Flag to track if setup step has been executed

const signInErrorMessage = '#gigya-login-form > section > div > div > div > div.message.message--error.gigya-error-display.gigya-error-code-403042.gigya-error-display-active'

const GigyaScreensetWait = 2000;
const LandingPageLoadingWait = 20000;

Before({ tags: "@runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-IN-A-001" }, () => {
    // Perform actions or setup that should run before the scenario
    cy.log("Before - Running Before step for @runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-IN-A-001");

    if (!setupStepExecuted) {
        // Run the setup step only once
        cy.log("Running setup step...");
        setupStepExecuted = true; // Set the flag to indicate setup step has been executed

        envData = new EnvDataUtil();
        // fromFixture is a static method that initializes a new User object
        // start with default User - with intention to change later in scenario
        user = User.fromFixture(envData, "userdefault");
    };
});

Given('The User navigates to the Sign-in Page', () => {
    user.attemptsTo(new NavigateToSignInPage(user));
});

Given('The User selects \'Accept all\' on the Cookie Popup', () => {
    user.attemptsTo(new DealWithCookiePopUp(DealWithCookiePopUp.AcceptAll));
});

Given("I have a registered {string} user with valid credentials", (usertype: string) => {
    user = User.withUserType(envData, usertype);
});

When("The User's email {string} is entered", (EmailAddress: string) => {
    let SignInCredential = (EmailAddress = "[VALID]") ? user.userData.email : EmailAddress;
    user.attemptsTo(new EnterSignInCredentialsEmailAddress(user, SignInCredential));
});

When("The User's password {string} is entered", (Password: string) => {
    let SignInCredential = (Password = "[VALID]") ? user.userData.password : Password;
    user.attemptsTo(new EnterSignInCredentialsPassword(user, SignInCredential));
});

When("The User clicks the Sign-in button", () => {
    user.attemptsTo(new ClicksSignInBtn(user));
    cy.wait(GigyaScreensetWait); //Give Gigya Screenset chance to diasappear      
});

Then("The User should be signed in and redirected to their {string} Landing Page", (LandingPage: string) => {
    let expectedURL = envData.users.getUsertypeLandingPage(LandingPage as keyof UsertypeLandingPage);
    user.asks(new IsPageDisplayed(user, expectedURL, LandingPageLoadingWait));
    cy.wait(LandingPageLoadingWait); //Give landing page chance to fully load
});

Then("finally The User navigates to the Sign-out Page, waiting to be fully signed out", () => {
    user.attemptsTo(new SignOutAndWaitForFullProcess(user, envData));
});

Given('I have a unregistered user with invalid credentials', () => {
    envData = new EnvDataUtil();
    let userData: UserData = {
        username: 'InvalidUsername',
        email: 'InvalidEmail@example.com',
        password: 'InvalidPassword',
        passwordChange: 'InvalidPasswordChange',
        userType: 'InvalidUserType',
    };
    user = new User("unregistered user", userData);
});

Then('The User should not be signed in and the Sign-in Error Message should be displayed', () => {
    cy.get(signInErrorMessage).should('be.visible');
});

Given('The User enters their credentials', () => {
    user.attemptsTo(new EnterSignInCredentials(user));
});