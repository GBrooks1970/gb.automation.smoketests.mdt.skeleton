import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { IsPageDisplayed, DoesCurrentURLInclude } from '../../../screenplay/questions/common/IsPageDisplayed';
import { User } from '../../../screenplay/actors/User';

const SignOutPageWait = 4000;
const SignOutProcessWait = 1500;
const LoggedOutMessageWait = 30000;

let envDataG = new EnvDataUtil();

export class WaitForFullSignOut {
    envData!: EnvDataUtil;
    user: User;
    constructor(user: User, envData: EnvDataUtil = envDataG) {
        this.user = user;
    };

    performAs() {
        //Give Gigya/Identity chance to fully sign-out
        //This takes a while (2 stage process)  
        cy.log('Waiting to fully Sign-out The User');
        cy.wait(SignOutProcessWait);// give a bit of time for process move on

        this.user.asks(
            new DoesCurrentURLInclude(this.user, `${this.envData?.getEndpoint('accountLogout')}`, SignOutPageWait)
        );

        cy.get("p[automation-id='loggedOutMessage']", { timeout: LoggedOutMessageWait });

        this.user.asks(
            new DoesCurrentURLInclude(this.user, `${this.envData?.getEndpoint('accountSignedout')}`, SignOutPageWait)
        );

        cy.wait(SignOutProcessWait);// give a bit of time for process to finalize

    };
};