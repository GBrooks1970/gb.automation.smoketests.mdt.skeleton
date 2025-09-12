import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { IsPageDisplayed, DoesCurrentURLInclude } from '../../questions/common/IsPageDisplayed';
import { Button, Field, Select } from '../../interactions/DOM.interactions';
import { TopazUser } from '../../actors/TopazUser';

let envDataG = new EnvDataUtil();
const logoutBtn = 'a:contains(Logoff)'
const logoutURL = 'Logout'

export class SignOutOfTopazAndWaitForFullProcess {
    envData!: EnvDataUtil;
    topazUser: TopazUser;

    constructor(topazUser: TopazUser) {
        this.topazUser = topazUser;
    };

    performAs() {
        cy.log("Logging out from Topaz")
        this.topazUser.attemptsTo(Button.Click(logoutBtn));
        this.topazUser.asks(new DoesCurrentURLInclude(this.topazUser, logoutURL));
    };
};