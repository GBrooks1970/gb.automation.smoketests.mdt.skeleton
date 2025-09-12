
import 'cypress-wait-until';
import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';

import { CookiePopup } from "../../../screenplay/interactions/CookiePopup";

import { NavigateToSignInPage } from '../../../screenplay/tasks/common/navigation/NavigateToSignInPage';
import { DealWithCookiePopUp } from '../../../screenplay/tasks/common/DealWithCookiePopUp';
import { ClicksSignInBtn, ClicksSignOutBtn, EnterSignInCredentials } from '../../../screenplay/tasks/common/EnterSignInCredentials';
import { IsPageDisplayed, DoesCurrentURLInclude } from '../../../screenplay/questions/common/IsPageDisplayed';
import { NavigateToSearchDashboardPage } from '../../../screenplay/tasks/common/navigation/NavigateToSearchDashboardPage';
import { UsertypeLandingPage } from "cypress/support/utils/env/UserInfoData";
import { SignInAndWaitForFullProcess } from '../../../screenplay/tasks/common/SignInAndWaitForFullProcess';
import { WaitForFullSignOut } from '../../../screenplay/tasks/common/WaitForFullSignOut';

const LandingPageLoadingWait = 20000;

let envData = new EnvDataUtil();
let user: User;
let setupStepExecuted = false; // Flag to track if setup step has been executed

Before({ tags: "@runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-OUT-A-001" }, () => {
    // Perform actions or setup that should run before the scenario
    cy.log("Before - Running Before step for @runBeforeHook_SetUserList_OnlyOnce_SHARED-SERVICES-SIGN-OUT-A-001");

    if (!setupStepExecuted) {
        // Run the setup step only once
        cy.log("Running setup step...");
        setupStepExecuted = true; // Set the flag to indicate setup step has been executed

        // fromFixture is a static method that initializes a new User object
        // start with default User - with intention to change later in scenario
        user = User.fromFixture(envData, "userdefault");
    };
});

Given('I have a DEFAULT registered Valid user that is signed in', () => {
    user = User.fromDefault(envData);
    user.attemptsTo(new SignInAndWaitForFullProcess(user,envData));
});

Then('I wait for the spinner to disappear', () => {
    cy.waitForElementToDisappear('.blob-spinner');
});

// <div data-v-1cdffb3a="" data-v-4827f116="" class="blob-spinner"></div>

When('I click the Sign-out button', () => {
    user.attemptsTo(new ClicksSignOutBtn(user));
});

When('I navigate to the dashboard page', () => {
    user.attemptsTo(new NavigateToSearchDashboardPage(user));
});

Then('after waiting for process to complete, I should be be fully signed out', () => {
    //Give Gigya/Identity chance to fully sign-out
    //This takes a while (2 stage process)  
    user.attemptsTo(new WaitForFullSignOut(user, envData));
});

Then('I should be redirected to the Sign-in page', () => {
    user.asks(new DoesCurrentURLInclude(user, envData.getEndpoint("accountLogin"), LandingPageLoadingWait));
});