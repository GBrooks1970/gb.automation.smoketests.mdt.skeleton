import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { User } from '../../actors/User';
import { ClicksSignInBtn, ClicksSignOutBtn, EnterSignInCredentials } from './EnterSignInCredentials';
import { WaitForFullSignOut } from './WaitForFullSignOut';
import { NavigateToSignOutPage } from './navigation/NavigateToSignOutPage';

let envDataG = new EnvDataUtil();

export class SignOutAndWaitForFullProcess {
    envData!: EnvDataUtil;
    user: User;
    clickMenu: boolean = false;

    constructor(user: User, envData: EnvDataUtil = envDataG, clickMenu: boolean = false) {
        this.user = user;
        this.clickMenu = clickMenu;
    };

    performAs() {
        if (this.clickMenu) {
            this.user.attemptsTo(new ClicksSignOutBtn(this.user));
        }
        else {
            this.user.attemptsTo(new NavigateToSignOutPage(this.user));
        };
        this.user.attemptsTo(new WaitForFullSignOut(this.user, this.envData));
    };
};