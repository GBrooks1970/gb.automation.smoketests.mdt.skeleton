import { User } from 'cypress/support/screenplay/actors/User';
import { DealWithCookiePopUp } from '../DealWithCookiePopUp';
import { navigateTo_Base } from '../../../core/NavigateTo_Base';

export class NavigateToAdviserPortalDashboard extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };
     
    performAs() {
        this.user.attemptsTo(new DealWithCookiePopUp(DealWithCookiePopUp.AcceptAll));
        this.nav.navigateToAdviserPortalDashboard(this.user);
    };
};