import { User } from '../../../actors/User';
import { navigateTo_Base } from '../../../core/NavigateTo_Base';

export class NavigateToAdviserCentreManagementContactsPage extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };
     
    performAs() {
        this.nav.navigatetoAdviserCentreManagementContactsPage(this.user);
    };
};