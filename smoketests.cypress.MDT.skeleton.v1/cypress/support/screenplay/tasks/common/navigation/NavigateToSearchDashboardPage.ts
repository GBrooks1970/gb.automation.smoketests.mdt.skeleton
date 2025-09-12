import { User } from 'cypress/support/screenplay/actors/User';
import { navigateTo_Base } from '../../../core/NavigateTo_Base';

export class NavigateToSearchDashboardPage extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };

    performAs() {
        this.nav.navigateToSearchDashboardPage(this.user);
    };
};