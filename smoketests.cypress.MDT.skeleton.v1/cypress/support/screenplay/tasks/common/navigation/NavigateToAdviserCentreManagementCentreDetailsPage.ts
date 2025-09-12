import { User } from '../../../actors/User';
import { navigateTo_Base } from '../../../core/NavigateTo_Base';

export class NavigateToAdviserCentreManagementCentreAndReferenceDetailsPage extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };
     
    performAs() {
        this.nav.navigatetoAdviserCentreManagementCentreDetailsPage(this.user);
    };
};