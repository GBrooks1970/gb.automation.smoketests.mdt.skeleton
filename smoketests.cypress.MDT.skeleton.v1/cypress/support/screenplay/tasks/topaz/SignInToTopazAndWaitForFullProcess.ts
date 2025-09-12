import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { IsPageDisplayed, DoesCurrentURLInclude } from '../../questions/common/IsPageDisplayed';
import { NavigateToTopazSignInPage } from '../common/navigation/topaz/NavigateToTopazSignInPage';
import { EnterTopazSignInCredentials, ClicksTopazSignInBtn } from './EnterTopazSignInCredentials';
import { TopazUser } from '../../actors/TopazUser';

let envDataG = new EnvDataUtil();
const topazDashboardPage = 'http://internal-npsit-topaz-ui-int-alb-1697792916.eu-west-1.elb.amazonaws.com/topaz/securityservlet'

export class CheckUserSignedInToTopaz {
    envData!: EnvDataUtil;
    topazUser: TopazUser;
    constructor(topazUser: TopazUser, envData: EnvDataUtil = envDataG) {
        this.topazUser = topazUser;
    };

    performAs() {
        cy.log("Assert user is indeed signed in, so we have a valid test");
        this.topazUser.asks(new IsPageDisplayed(this.topazUser, topazDashboardPage));
    };
}

export class NavigateAndSignInToTopaz {
    envData!: EnvDataUtil;
    topazUser: TopazUser;
    constructor(topazUser: TopazUser, envData: EnvDataUtil = envDataG) {
        this.topazUser = topazUser;
    };
    performAs() {
        //The User navigates to the Sign-in Page
        this.topazUser.attemptsTo(new NavigateToTopazSignInPage(this.topazUser));
        //The User enters their credentials
        this.topazUser.attemptsTo(new EnterTopazSignInCredentials(this.topazUser));
        //The User clicks the Sign-in button
        this.topazUser.attemptsTo(new ClicksTopazSignInBtn(this.topazUser));
    }
}

export class SignInToTopazAndWaitForFullProcess {
    envData!: EnvDataUtil;
    topazUser: TopazUser;
    constructor(topazUser: TopazUser, envData: EnvDataUtil = envDataG) {
        this.topazUser = topazUser;
    };

    performAs() {
        this.topazUser.attemptsTo(new NavigateAndSignInToTopaz(this.topazUser, this.envData));
        this.topazUser.attemptsTo(new CheckUserSignedInToTopaz(this.topazUser, this.envData));
    };
};