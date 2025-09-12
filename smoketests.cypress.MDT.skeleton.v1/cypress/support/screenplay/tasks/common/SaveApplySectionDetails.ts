import { User } from '../../actors/User';
import { Button, Field, Select, } from '../../interactions/DOM.interactions';

const saveBtn = '#save'

export class SaveApplySectionDetails {
    user: User;
    constructor(user: User) {
        this.user = user;
    }

    performAs() {
        this.user.attemptsTo(Button.Click(saveBtn));
    };
};