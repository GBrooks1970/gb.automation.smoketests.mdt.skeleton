import { UCAS } from '../../../utils/UCAS-consts';
import { QueryCurrentURL } from '../../queries/common/QueryCurrentURL';
import { User } from '../../actors/User';

export class IsPageDisplayed {
  user: User;
  expectedURL: string;
  urlTimeout: number = UCAS.urlTimeout;

  constructor(user: User, expectedURL: string, urlLoadTimeout: number = UCAS.urlTimeout) {
    this.user = user;
    this.expectedURL = expectedURL;
    this.urlTimeout = urlLoadTimeout;
  };

  answeredBy() {
    cy.log(`Checking the correct URL has loaded : expectedURL = ${this.expectedURL} : urlTimeout = ${this.urlTimeout}`);
    (this.user.queries(new QueryCurrentURL(this.urlTimeout)))
      .should((url: string) => {
        //Change both to lowercase before checking
        expect(url.toLowerCase()).to.equal(this.expectedURL.toLowerCase());
      });
  };
};

export class DoesCurrentURLInclude {
  user: User;
  expectedPartURL: string;
  urlTimeout: number = UCAS.urlTimeout;

  constructor(user: User, expectedURL: string, urlLoadTimeout: number = UCAS.urlTimeout) {
    this.user = user;
    this.expectedPartURL = expectedURL;
    this.urlTimeout = urlLoadTimeout;
  };

  answeredBy() {
    cy.log(`Checking the URL includes : expectedPartURL = ${this.expectedPartURL} : urlTimeout = ${this.urlTimeout}`);
    (this.user.queries(new QueryCurrentURL(this.urlTimeout)))
      .should((url: string) => {
        //Change both to lowercase before checking
        expect(url.toLowerCase()).to.include(this.expectedPartURL.toLowerCase());
      });
  };
};