import { User } from 'cypress/support/screenplay/actors/User';
import { navigateTo_Base } from '../../../../core/NavigateTo_Base';

export class NavigateToTopazMoreAboutYouAndExtraActivitiesPage extends navigateTo_Base {
    constructor(user: User) {
        super(user);
    };
     
    performAs() {
        this.nav.navigateToTopazMoreAboutYouExtraActivitiesPage(this.user);
    };
};