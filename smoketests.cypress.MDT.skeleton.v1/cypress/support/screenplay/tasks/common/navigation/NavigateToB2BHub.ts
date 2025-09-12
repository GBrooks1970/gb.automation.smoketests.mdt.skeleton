import { User } from 'cypress/support/screenplay/actors/User';
import { navigateTo_Base } from '../../../core/NavigateTo_Base';

export class NavigateToB2BHub extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };
    
    performAs() {
        this.nav.navigateToB2BHubPage(this.user);
    };
};