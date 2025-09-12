/*
Cypress https://docs.cypress.io/guides/references/configuration#Timeouts
pageLoadTimeout	= 60000	
    Time, in milliseconds, to wait for page transition events 
    or cy.visit(), cy.go(), cy.reload() commands to fire their page load events. 
    Network requests are limited by the underlying operating system, 
    and may still time out if this value is increased.
*/

import { Button, Field } from './DOM.interactions';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { User } from '../actors/User';
import { UCAS } from 'cypress/support/utils/UCAS-consts';
import { DealWithCookiePopUp } from '../tasks/common/DealWithCookiePopUp';

const continueUGApplicationLink = '#section--content > div > div > div > div.dashboard-container > div > div:nth-child(4) > div > div.apply-panel > div > div > div > div.apply-panel__container > div.apply-panel__action.apply-panel__action--inline > button';
const continueUCApplicationLink = '#section--content > div > div > div > div.dashboard-container > div > div:nth-child(5) > div > div.apply-panel > div > div > div > div.apply-panel__container > div.apply-panel__action.apply-panel__action--inline > button';
const contactDetailsSectionNavigation = '#contactResidencyDetails';
const contactDetailsSectionPageBanner = '#section--content > ng-component > div.theme-slate-translucent.no-print > div > nav > ol > li:nth-child(4)';
const educationSectionNavigation = "article.card--application-section a#education";
const educationSectionPageBanner = `#section--content > ng-component > div.theme-slate > div > div`;
const hubHome = "a.breadcrumb__home";
const applicationHome = "nav a#displayName_0";
const topazErrorGoBackButton = "input[name='Back']";
const topazApplicationsBtn = '#navigationMenu > h1:nth-child(5)';
const topazApplicationEnquiryBtn = '#navApplications > li:nth-child(1) > a';
const topazApplicationHistoryBtn = '#navApplications > li:nth-child(4) > a';
const topazApplicationMaintainFeeBtn = '#navApplications > li:nth-child(3) > a';
const topazQualificationsReceievedPage = '#navApplications > li:nth-child(5) > a';
const topazQualificationsAwaitingPage = '#navApplications > li:nth-child(6) > a';
const topazPersonalStatementPage = '#navApplications > li:nth-child(7) > a';
const topazReferencePage = '#navApplications > li:nth-child(8) > a';
const topazOtherDetailsPage = '#navApplications > li:nth-child(9) > a';
const topazMoreAboutYouExtraActivitiesPage = '#navApplications > li:nth-child(11) > a';
const userMenuBtn = '#global-user-menu-toggle';
const adviserPortalNavigationBtn = '#global-user-menu-panel > ul > li:nth-child(2) > a';
const selectPageTimeout = 5000;
const navigateForwardTimeout = 5000;
const navigateBackwardTimeout = 5000;
const manageVacanciesBtnTimeout = 50000
const navigateToSignInPageLoadTimeout = 20000;
const navigateToSignOutPageLoadTimeout = 20000;
const navigateToEmployerSearchPageLoadTimeout = 20000;
const navigateToContactDetailsSectionWait = 10000;
const navigateToEducationSectionWait = 10000;
const continueUCApplicationTimeout = 20000;
const userMenuBtnTimeout = 5000
const adviserApplicantListPageWait = 5000;
const adviserTrackingOffersAndDecisions = 5000;
const adviserApplicantListPageTimeout = 20000;
const adviserDashboardPageLoadTimeout = 10000;
const adviserCentreManagementPageTimeout = 10000;
const signInPageWait = 5000;
const adviserWaitForRefereePage = 2000;
const careerFinderBtn = '#dashboard > div > div.content-section.live-region > section > div > article:nth-child(2) > a';
const addVacancyBtn = '#content > div.employer-content > div > div.content.content-section.prose > div > button';
const currentPageIndicator = `[aria-current="page"]`;
const navigateBackToAdviserApplicationsListPage = '#backButton';
const applicationListPageTitle = '#title';
const trackApplicationsPageTitle = '#title';
const adviserPortalDashboardTitle = '#dashboardTabsContainer > div.tabs__content.prose.tabs__content--active > h2:nth-child(1)';
const emailLoginSelector = '#ucas-input-login';
const centreManagementPageTitle = '#section--content > centre-view > div > article > header > h1'
const referenceTemplateTab = '#section--content > centre-view > div > article > df-tab-control > div > div.sidebar.sidebar--first.content-section.prose > nav > div > ul > li:nth-child(8) > a';
const navigateBackToAdviserDashboardFromCentreManagementBtn = '#section--lower-header > section > div > a'
const centreManagementGroupsTab = '.sticky-nav__items > :nth-child(5) > a';
const centreManagementQualificationsTab = '.sticky-nav__items > :nth-child(4) > a';
const centreManagementRefereesTab = '#section--content > centre-view > div > article > df-tab-control > div > div.sidebar.sidebar--first.content-section.prose > nav > div > ul > li:nth-child(7) > a';
const centreManagementContactsTab = '.sticky-nav__items > :nth-child(2) > a';
const centreManagementAppFeePaymentMethodsTab = '#section--content > centre-view > div > article > df-tab-control > div > div.sidebar.sidebar--first.content-section.prose > nav > div > ul > li:nth-child(6)'
const centreManagementCentreLinkingBuzzwordTab = '#section--content > centre-view > div > article > df-tab-control > div > div.sidebar.sidebar--first.content-section.prose > nav > div > ul > li:nth-child(3)'
const centreManagementCentreAndReferenceDetailsTab = '#section--content > centre-view > div > article > df-tab-control > div > div.sidebar.sidebar--first.content-section.prose > nav > div > ul > li:nth-child(1)'
const searchByNameCodeBox = '#searchByNameOrCode';
const searchResults = '#centre-results > li > a';
const waitForSearchResults = 2000;
const advisersTab = '#dashboardTabsContainer > div.tabs__tabs-container > a:nth-child(3)';
const goToStudentHubActivityBtn = '#hubActivity1';
let adviserPortalCycleYear: string;
let signInPageLoaded: boolean;
let applicationLoaded: boolean;
let userMenuBtnAvailable: boolean;
let adviserDashboardPageLoaded: boolean;
let centreManagementLoaded: boolean;

let envData = new EnvDataUtil();

export class Navigation {

    constructor() {
    };

    navigateToSignInPage(user: User, pageLoadTimeout: number = navigateToSignInPageLoadTimeout) {
        let signInPageLoaded: boolean;
        cy.log(`Navigating to Sign-In Page : pageLoadTimeout ${pageLoadTimeout}`);
        cy.visit(`${envData?.getEndpoint('baseUrlAccounts')}${envData?.getEndpoint('accountLogin')}`
        , { timeout: pageLoadTimeout });
        cy.wait(signInPageWait);    
        cy.isElementPresent(emailLoginSelector).then(isPresent => {
            signInPageLoaded = isPresent;
            if (signInPageLoaded) {
                cy.log('Sign-In Page Loaded');
            } else {
                cy.reload();
            };
        });
    };

    navigateToSignOutPage(user: User, pageLoadTimeout: number = navigateToSignOutPageLoadTimeout) {
        cy.log(`Navigating to Sign-Out Page : pageLoadTimeout ${pageLoadTimeout}`);
        cy.log(`This should Sign-out The User`);
        cy.visit(`${envData?.getEndpoint('baseUrlAccounts')}${envData?.getEndpoint('accountLogout')}`
            , { timeout: pageLoadTimeout });
    };

    navigateToEmployerSearchPage(user: User, pageLoadTimeout: number = navigateToEmployerSearchPageLoadTimeout) {
        cy.log(`Navigating to EmployerSearch Page`);
        cy.visit(`${envData?.getEndpoint('baseUrlServices')}${envData?.getEndpoint('employerSearchVacancyURL')}`, { timeout: pageLoadTimeout });
    }

    navigateToManageVacancies(user: User) {
        cy.log(`Navigating to Manage Vacancy Page`);
        user.attemptsTo(Button.Click(careerFinderBtn, { timeout: manageVacanciesBtnTimeout }));
    }

    navigateToAddVacancy(user: User) {
        cy.log(`Navigating to Add Vacancy Page`);
        user.attemptsTo(Button.Click(addVacancyBtn));
    }

    selectPage(user: User, paginationBarSelector: string, expectedPageNumber: number, pageLoadTimeout: number = selectPageTimeout) {
        cy.get(paginationBarSelector)
          .contains(expectedPageNumber.toString())
          .then(($expectedPageNumberSelector) => {
           const expectedPageNumberSelector: any = $expectedPageNumberSelector;

            cy.log(`Clicking Page number ${expectedPageNumber}`);
            user.attemptsTo(Button.Click(expectedPageNumberSelector));

            cy.get(paginationBarSelector, { timeout: selectPageTimeout}).find(currentPageIndicator)
              .should(($element) => {
                const currentPageNumber = parseInt($element.text());
                expect(currentPageNumber).to.equal(expectedPageNumber);
              });
          });
    cy.log(`Successfully navigated to Page ${expectedPageNumber}`);
    };

    navigateForward(user: User, forwardArrowSelector: string, expectedPageNumber: number, paginationBarSelector: string) {
        const clickForwardArrow = () => {
            cy.get(paginationBarSelector, { timeout: navigateForwardTimeout }).find(currentPageIndicator).then(($currentSelectedPage) => {
                const currentPageNumber = parseInt($currentSelectedPage.text());
                cy.log(`Current page number: ${currentPageNumber}, Expected page number: ${expectedPageNumber}`);
                if (currentPageNumber > expectedPageNumber) {
                    throw new Error('Unable to navigate to a lower page number using the forward arrow');
                }
                else if (currentPageNumber !== expectedPageNumber) {
                    cy.log(`Navigating forward 1 page to reach page ${expectedPageNumber}`);
                    user.attemptsTo(Button.Click(forwardArrowSelector));
                    // Use Cypress's retry mechanism to ensure the check is made again
                    clickForwardArrow();
                }
                else {
                    cy.log(`Successfully navigated to Page ${expectedPageNumber}`);
                    return
                }
            });
        };
        clickForwardArrow();
    }

    navigateBackward(user: User, backArrowSelector: string, expectedPageNumber: number, paginationBarSelector: string) {
        const clickBackArrow = () => {
            cy.get(paginationBarSelector, { timeout: navigateBackwardTimeout }).find(currentPageIndicator).then(($currentSelectedPage) => {
                const currentPageNumber = parseInt($currentSelectedPage.text());
                cy.log(`Current page number: ${currentPageNumber}, Expected page number: ${expectedPageNumber}`);
                if (currentPageNumber < expectedPageNumber) {
                    throw new Error('Unable to navigate to a higher page number using the back arrow');
                }
                else if (currentPageNumber !== expectedPageNumber) {
                    cy.log(`Navigating back 1 page to reach page ${expectedPageNumber}`);
                    user.attemptsTo(Button.Click(backArrowSelector));
                    // Use Cypress's retry mechanism to ensure the check is made again
                    clickBackArrow();
                }
                else {
                    cy.log(`Successfully navigated to Page ${expectedPageNumber}`);
                    return
                }
            });
        };
        clickBackArrow();
    }

    navigateToTopazSignInPage(user: User) {
        cy.log(`${user.Name} : Navigating to Topaz Sign-In Page`);
        cy.visit(`${envData?.getEndpoint('topazURL')}`);
    };

    navigateToSearchDashboardPage(user: User) {
        cy.log(`Navigating to Dashboard Page`);
        cy.visit(`${envData?.getEndpoint('baseUrlDigital')}${envData?.getEndpoint('searchDashboard')}`);
    };

    navigateToB2BHubPage(user: User) {
        cy.log(`Navigating to B2B Hub`);
        cy.visit(`${envData?.getEndpoint('baseUrl')}${envData?.getEndpoint('b2bhub')}`);
    }

    navigateToContinueApplication(user: User) {
        cy.log(`Navigating to Continue Application`);
        user.attemptsTo(Button.Click(continueUGApplicationLink));
    };

    navigateToContinueUCApplication(user: User) {
        cy.log(`Navigating to Continue Application`);
        cy.get(continueUCApplicationLink, { timeout: continueUCApplicationTimeout })
        user.attemptsTo(Button.Click(continueUCApplicationLink));
    };

    navigateToContactDetailsSection(user: User) {
        cy.get(contactDetailsSectionNavigation, { timeout: navigateToContactDetailsSectionWait })
        cy.log(`Navigating to Contact Details Section`);
        user.attemptsTo(Button.Click(contactDetailsSectionNavigation));
        cy.get(contactDetailsSectionPageBanner);
    };

    navigateToEducationSection(user: User) {
        cy.get(educationSectionNavigation, { timeout: navigateToEducationSectionWait })
        cy.log(`Navigating to Education Section`);
        user.attemptsTo(Button.Click(educationSectionNavigation));
        cy.get(educationSectionPageBanner)
    };

    navigateToHubHome(user: User) {
        cy.log(`Navigating to Hub Home`);
        user.attemptsTo(Button.Click(hubHome));
    };

    navigateToApplicationHome(user: User) {
        cy.log(`Navigating to Hub Home`);
        user.attemptsTo(Button.Click(applicationHome));
    };

    navigateBackFromTopazErrorPage(user: User) {
        cy.log(`Navigating Back from Topaz Error Page`);
        user.attemptsTo(Button.Click(topazErrorGoBackButton));
    };

    navigateToTopazApplicationEnquiryPage(user: User) {
        cy.log(`Navigating to Topaz Application Enquiry`);
        user.attemptsTo(Button.Click(topazApplicationsBtn));
        user.attemptsTo(Button.Click(topazApplicationEnquiryBtn));
    };

    navigateToTopazApplicationHistoryPage(user: User) {
        cy.log(`Navigating to Topaz Application History Page`);
        user.attemptsTo(Button.Click(topazApplicationHistoryBtn));
    };

    navigateToTopazApplicationMaintainFeePage(user: User) {
        cy.log(`Navigating to Topaz Application Maintain Fee Page`);
        user.attemptsTo(Button.Click(topazApplicationMaintainFeeBtn));
    };

    navigateToTopazQualificationsReceivedPage(user: User) {
        cy.log(`Navigating to Topaz Qualifications Received Page`);
        user.attemptsTo(Button.Click(topazQualificationsReceievedPage));
    };

    navigateToTopazQualificationsAwaitingPage(user: User) {
        cy.log(`Navigating to Topaz Qualifications Awaiting Page`);
        user.attemptsTo(Button.Click(topazQualificationsAwaitingPage));
    };

    navigateToTopazPersonalStatementPage(user: User) {
        cy.log(`Navigating to Topaz Personal Statement Page`);
        user.attemptsTo(Button.Click(topazPersonalStatementPage));
    };

    navigateToTopazReferencePage(user: User) {
        cy.log(`Navigating to Topaz Reference Page`);
        user.attemptsTo(Button.Click(topazReferencePage));
    };

    navigateToTopazOtherDetailsPage(user: User) {
        cy.log(`Navigating to Topaz Other Details Page`);
        user.attemptsTo(Button.Click(topazOtherDetailsPage));
    };

    navigateToTopazMoreAboutYouExtraActivitiesPage(user: User) {
        cy.log(`Navigating to Topaz More About You and Extra Activities Page`);
        user.attemptsTo(Button.Click(topazMoreAboutYouExtraActivitiesPage));
    };

    navigateToAdviserPortalDashboard(user: User) {
        let userMenuBtnAvailable: boolean;
        cy.log(`Navigating to Adviser Portal Dashboard`);
        //Ensuring User Menu Button is available
        cy.isElementPresentWait(userMenuBtn, userMenuBtnTimeout).then(isPresent => {
            userMenuBtnAvailable = isPresent;
        });
        //logic for different user navigation
        if (user.userData === envData.users.getUserDefault()) {
            user.attemptsTo(Button.Click(advisersTab));
        } else {
            user.attemptsTo(Button.Click(userMenuBtn));
            user.attemptsTo(Button.Click(adviserPortalNavigationBtn, { force: true, ...UCAS.clickOptions }));
            user.attemptsTo(new DealWithCookiePopUp(DealWithCookiePopUp.AcceptAll));
        };
    };

    navigateToAdviserMaxSupportedCycleAppManagementAppListPage(user: User) {
        let applicationLoaded: boolean; 
        let adviserDashboardPageLoaded: boolean;
        let adviserPortalCycleYear = envData.adviserPortalData.getCycleYearDetails().MaxSupportedCycleYear;
        cy.log(`Navigating to Adviser Portal Max Supported Cycle ${adviserPortalCycleYear} Application Management Application List Page`);
        const adviserApplicantListBtn = `a:contains("Go to ${adviserPortalCycleYear} applicant list")`;
        //Ensuring Adviser Portal Dashboard Page has loaded
        cy.isElementPresentWait(adviserPortalDashboardTitle, adviserDashboardPageLoadTimeout).then(isPresent => {
            adviserDashboardPageLoaded = isPresent;
        });
        user.attemptsTo(Button.Click(adviserApplicantListBtn));
        //Waiting for Adviser Applicant List page to load
        cy.wait(adviserApplicantListPageWait);
        //Ensuring Adviser Applications List page has loaded
        cy.isElementPresentWait(applicationListPageTitle, adviserApplicantListPageTimeout).then(isPresent => {
            applicationLoaded = isPresent;
        });
        //Waiting again as Adviser Applicant List Page reloads
        cy.wait(adviserApplicantListPageWait)
        //Ensuring Adviser Applications List page has loaded
        cy.isElementPresentWait(applicationListPageTitle, adviserApplicantListPageTimeout).then(isPresent => {
            applicationLoaded = isPresent;
        });
    };

    navigateToAdviserMaxSupportedCycleAppManagementCentreManagementPage(user: User) {
        let adviserDashboardPageLoaded: boolean;
        let centreManagementLoaded: boolean;
        let adviserPortalCycleYear = envData.adviserPortalData.getCycleYearDetails().MaxSupportedCycleYear;
        cy.log(`Navigating to Adviser Portal Max Supported Cycle ${adviserPortalCycleYear} Application Management Centre Management Page`);
        const adviserCentreManagementBtn = `a:contains("Go to ${adviserPortalCycleYear} centre management")`;
        //Ensuring Adviser Portal Dashboard Page has loaded
        cy.isElementPresentWait(adviserPortalDashboardTitle, adviserDashboardPageLoadTimeout).then(isPresent => {
            adviserDashboardPageLoaded = isPresent;
        });
        user.attemptsTo(Button.Click(adviserCentreManagementBtn));
        //logic for different user navigation
        if (user.userData === envData.users.getUserDefault()) {
            //no further action required
        } else {
            //Ensuring Adviser Applications List page has loaded
            cy.isElementPresentWait(centreManagementPageTitle, adviserCentreManagementPageTimeout).then(isPresent => {
            centreManagementLoaded = isPresent;
            });
        }; 
    };

    navigateBackToAdviserApplicationsListPage(user: User) {
        let applicationLoaded: boolean;
        cy.log(`Navigating Back to Adviser Portal Applications List Page`);
        user.attemptsTo(Button.Click(navigateBackToAdviserApplicationsListPage, { force: true, ...UCAS.clickOptions }));
        cy.wait(adviserApplicantListPageWait);
        //Ensuring Adviser Applications List page has loaded
        cy.isElementPresentWait(applicationListPageTitle, adviserApplicantListPageTimeout).then(isPresent => {
            applicationLoaded = isPresent;
        });
    };

    navigateToAdviserCentreManagementReferenceTemplatePage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Reference Template Page`);
        user.attemptsTo(Button.Click(referenceTemplateTab));
    };

    navigateBackToAdviserDashboardFromCentreManagementPage(user: User) {
        let adviserDashboardPageLoaded: boolean;
        cy.log(`Navigating Back to Adviser Portal Dashboard`);
        user.attemptsTo(Button.Click(navigateBackToAdviserDashboardFromCentreManagementBtn, { force: true, ...UCAS.clickOptions }));
        //Ensuring Adviser Dashboard page has loaded
        cy.isElementPresentWait(adviserPortalDashboardTitle, adviserDashboardPageLoadTimeout).then(isPresent => {
            adviserDashboardPageLoaded = isPresent;
        });
    };

    navigateToAdviserCentreManagementGroupsPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Groups Page`);
        user.attemptsTo(Button.Click(centreManagementGroupsTab));
    };

    navigateToAdviserCentreManagementQualificationsPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Qualifications Page`);
        user.attemptsTo(Button.Click(centreManagementQualificationsTab));
    };

    navigatetoAdviserCentreManagementRefereesPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Referees Page`);
        user.attemptsTo(Button.Click(centreManagementRefereesTab));
        cy.wait(adviserWaitForRefereePage);
    };

    navigatetoAdviserCentreManagementContactsPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Contacts Page`);
        user.attemptsTo(Button.Click(centreManagementContactsTab));
    };

    navigatetoAdviserCentreManagementAppFeePaymentMethodsPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management App Fee Payment Methods Page`);
        user.attemptsTo(Button.Click(centreManagementAppFeePaymentMethodsTab));
    };

    navigatetoAdviserCentreManagementCentreLinkingBuzzwordPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Centre Linking (buzzword) Page`);
        user.attemptsTo(Button.Click(centreManagementCentreLinkingBuzzwordTab));
    };

    navigatetoDefaultAdviserCentreManagementCentreLinkingBuzzwordPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Centre Linking (buzzword) Page`);
        user.attemptsTo(Field.Fill(searchByNameCodeBox, envData.adviserPortalData.getAdviserPortalData().CentresData.CentreDetails.CentreNumber));
        cy.wait(waitForSearchResults);
        user.attemptsTo(Button.Click(searchResults));
        user.attemptsTo(Button.Click(centreManagementCentreLinkingBuzzwordTab));   
    };

    navigatetoOtherAdviserCentreManagementCentreLinkingBuzzwordPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Centre Linking (buzzword) Page`);
        user.attemptsTo(Field.Fill(searchByNameCodeBox, envData.adviserPortalData.getAdviserPortalData().CentresData.OtherCentreDetails.CentreNumber));
        cy.wait(waitForSearchResults);
        user.attemptsTo(Button.Click(searchResults));
        user.attemptsTo(Button.Click(centreManagementCentreLinkingBuzzwordTab));   
    };

    navigatetoAdviserCentreManagementCentreDetailsPage(user: User) {
        cy.log(`Navigating to Adviser Portal Centre Management Centre And Reference Details Page`);
        user.attemptsTo(Button.Click(centreManagementCentreAndReferenceDetailsTab));   
    };

    navigatetoAdviserMaxSupportedCycleTrackApplicationsPage(user: User) {
        let applicationsLoaded: boolean; 
        let adviserDashboardPageLoaded: boolean;
        let adviserPortalCycleYear = envData.adviserPortalData.getCycleYearDetails().MaxSupportedCycleYear;
        cy.log(`Navigating to Adviser Portal Max Supported Cycle ${adviserPortalCycleYear} Track Applications Page`);
        const adviserTrackingOffersAndDecisionsBtn = `a:contains("Go to ${adviserPortalCycleYear} tracking offers & decisions")`;
        //Ensuring Adviser Portal Dashboard Page has loaded
        cy.isElementPresentWait(adviserPortalDashboardTitle, adviserDashboardPageLoadTimeout).then(isPresent => {
            adviserDashboardPageLoaded = isPresent;
        });
        user.attemptsTo(Button.Click(adviserTrackingOffersAndDecisionsBtn));
        //Waiting for Adviser Applicant List page to load
        cy.wait(adviserTrackingOffersAndDecisions);
        //Ensuring Adviser Applications List page has loaded
        cy.isElementPresentWait(trackApplicationsPageTitle).then(isPresent => {
            applicationsLoaded = isPresent;
        });
    };

    navigatetoAdviserStudentHubActivityPage(user: User) {
        //Ensuring Adviser Portal Dashboard Page has loaded
        cy.isElementPresentWait(adviserPortalDashboardTitle, adviserDashboardPageLoadTimeout).then(isPresent => {
            adviserDashboardPageLoaded = isPresent;
        });
        user.attemptsTo(Button.Click(goToStudentHubActivityBtn));
    };
};