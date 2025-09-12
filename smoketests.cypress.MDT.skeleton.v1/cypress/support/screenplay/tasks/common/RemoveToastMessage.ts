import { User } from '../../actors/User';
import { Button, Field, Select } from '../../interactions/DOM.interactions';
const removeToastMessageSelector = '.toast-close-button'

export class RemoveToastMessage {
    user: User
    constructor (user: User) {
        this.user = user;
    }
    performAs() {
        this.user.attemptsTo(Button.Click(removeToastMessageSelector));
    };
};