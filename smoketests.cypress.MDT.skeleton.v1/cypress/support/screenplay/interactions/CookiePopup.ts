const cookiePopupWait = 3000
const cookiePopupTimeout = 3000

export class CookiePopup {
    static cookieDialog: string = "#CybotCookiebotDialog";
    static acceptAllButton: string = "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll";
    static acceptSelectedButton: string = "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection";
    static acceptNecessaryButton: string = "#CybotCookiebotDialogBodyButtonDecline";

    static AcceptAll() {
        //wait to allow cookie popup to load
        cy.wait(cookiePopupWait);
        cy.isElementPresent(this.cookieDialog).then(isPresent => {
            const cookiePopup = isPresent;
            if (cookiePopup) {
                cy.get(this.cookieDialog).
                should('have.attr', 'aria-modal', 'true').
                log('Cookie Popup : Accepting all').
                get(this.acceptAllButton, {timeout: cookiePopupTimeout}).click();
            } else {
                cy.log('Cookie Popup: Element not found');
            }
        });
    };

    static AcceptSelected() {
        //wait to allow cookie popup to load
        cy.wait(cookiePopupWait);
        cy.isElementPresent(this.cookieDialog).then(isPresent => {
            const cookiePopup = isPresent;        
            if (cookiePopup) {
                cy.get(this.cookieDialog).
                should('have.attr', 'aria-modal', 'true').
                log('Cookie Popup : Accepting selected').
                get(this.acceptSelectedButton, {timeout: cookiePopupTimeout}).click();
            } else {
                cy.log('Cookie Popup: Element not found');
            }
        });
    };

    static AcceptNecessary() {
        //wait to allow cookie popup to load
        cy.wait(cookiePopupWait);
        cy.isElementPresent(this.cookieDialog).then(isPresent => {
            const cookiePopup = isPresent; 
            if (cookiePopup) {
                cy.get(this.cookieDialog).
                should('have.attr', 'aria-modal', 'true').
                log('Cookie Popup : Accepting necessary').
                get(this.acceptNecessaryButton, {timeout: cookiePopupTimeout}).click();
            } else {
                cy.log('Cookie Popup: Element not found');
            }
        });
    };
}