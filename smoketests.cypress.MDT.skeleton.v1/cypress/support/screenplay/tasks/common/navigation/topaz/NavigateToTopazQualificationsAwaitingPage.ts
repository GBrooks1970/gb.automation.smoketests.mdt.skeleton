import { User } from 'cypress/support/screenplay/actors/User';
import { navigateTo_Base } from '../../../../core/NavigateTo_Base';

export class NavigateToTopazQualificationsAwaitingPage extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };
     
    performAs() {
        this.nav.navigateToTopazQualificationsAwaitingPage(this.user);
    };
};