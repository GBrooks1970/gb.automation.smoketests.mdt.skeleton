import { User } from 'cypress/support/screenplay/actors/User';
import { navigateTo_Base } from '../../../core/NavigateTo_Base';

export class NavigateToHubHome extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };

    performAs() {
        this.nav.navigateToHubHome(this.user);
    };
};