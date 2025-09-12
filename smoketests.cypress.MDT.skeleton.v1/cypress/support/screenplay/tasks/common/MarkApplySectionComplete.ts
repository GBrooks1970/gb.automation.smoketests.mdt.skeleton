import { User } from '../../actors/User';
import { Button, Field, Select, } from '../../interactions/DOM.interactions';

const markSectionCompleteCheckbox = '#markedAsSectionComplete';

export class MarkApplySectionComplete {    
    user: User;
    constructor(user: User) {
        this.user = user;
    }
    
    performAs() {
       this.user.attemptsTo(Select.RadioButton(markSectionCompleteCheckbox));
    };
};