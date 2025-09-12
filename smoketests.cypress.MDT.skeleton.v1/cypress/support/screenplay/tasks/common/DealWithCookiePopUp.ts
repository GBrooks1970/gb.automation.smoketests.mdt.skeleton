import { CookiePopup } from '../../interactions/CookiePopup'

export class DealWithCookiePopUp {
    static readonly AcceptAll = 'AcceptAll';
    static readonly AcceptSelected = 'AcceptSelected';
    static readonly AcceptNecessary = 'AcceptNecessary';
    
    localAction: string;
    constructor(action: string = DealWithCookiePopUp.AcceptAll) {
        this.localAction = action;
    };
    performAs() {
        if (this.localAction == DealWithCookiePopUp.AcceptAll)
        {
            cy.log('Cookie Popup: User AcceptAll');
            CookiePopup.AcceptAll();
        } else if (this.localAction == DealWithCookiePopUp.AcceptSelected)
        {
            cy.log('Cookie Popup: User AcceptSelected');
            CookiePopup.AcceptSelected();
        } else if (this.localAction == DealWithCookiePopUp.AcceptNecessary)
        {
            cy.log('Cookie Popup: User AcceptNecessary');
            CookiePopup.AcceptNecessary();
        };
    };
};