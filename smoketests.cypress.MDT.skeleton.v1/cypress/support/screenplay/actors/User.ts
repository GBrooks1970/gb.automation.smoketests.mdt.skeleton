import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { UserData, EmptyUserData } from "cypress/support/utils/env/UserData";
import CommonUtils from '../../utils/common-utils';

let envDataG = new EnvDataUtil();

export class User {
    Name: string;
    userData!: UserData;

    constructor(
        Name: string, userData?: UserData) {
        this.Name = Name || '';
        //If userDate passed in use that data - if not use the default data
        this.userData = userData ? userData : EmptyUserData;
    };

    static named(Name: string) {
        return new User(Name);
    }

    static namedWithUserData(Name: string, userData: UserData) {
        let user = new User(Name);
        user.userData = userData;
        return user;
    }

    static fromDefault(envData: EnvDataUtil = envDataG): User {
        // Initialize the User object with some predefined UserData
        let userData = EmptyUserData;

        //Get data from fixture file - if it exists
        let foundUserData = envData.users.getUserDefault();
        //If found use that data - if not use the default data
        if (foundUserData)
            userData = foundUserData;

        //console.log(`fromDefault userData: ${CommonUtils.toJSONStringEscaped(userData)}`);
        return new User(userData.username, userData);
    }

    static fromFixture(envData: EnvDataUtil = envDataG, username: string): User {
        // Initialize the User object with some predefined UserData
        let userData = EmptyUserData;

        //Get data from fixture file - if it exists
        if (username) {
            let foundUserData = envData.users.getUserByUsername(username);
            //If found use that data - if not use the default data
            if (foundUserData)
                userData = foundUserData;
        }

        //console.log(`fromFixture userData: ${CommonUtils.toJSONStringEscaped(userData)}`);
        return new User(userData.username, userData);
    }

    static withUserType(envData: EnvDataUtil = envDataG, userType: string): User {
        // Initialize the User object with some predefined UserData
        let userData = EmptyUserData;

        //Get data from fixture file - if it exists
        if (userType) {
            let foundUserData = envData.users.getUserByUserType(userType);
            //If found use that data - if not use the default data
            if (foundUserData)
                userData = foundUserData;
        }

        //console.log(`withUserType userData: ${CommonUtils.toJSONStringEscaped(userData)}`);
        return new User(userData.username, userData);
    }

    /**  method to handle attemptsTo (user tasks) */
    attemptsTo(...tasks: any[]) {
        // console.log(`User: ${this.Name} attempts to`);
        tasks.forEach((task, index) => {
            // console.log(`User: ${this.Name} - task #${index + 1}/${tasks.length}`);
            task.performAs(this);
        });
    }

    /**  asks method to handle questions that contain an assertion */
    asks(question: any) {
        // console.log(`User: ${this.Name} asks`);
        return question.answeredBy(this);
    }

    /**  method to handle queries (questions that are not assertions) */
    queries(query: any) {
        // console.log(`User: ${this.Name} queries`);
        return query.answeredBy(this);
    }

    /**  method to handle waitsFor (user pauses) */
    waitsFor(waitsFor: number = 1) {
        // console.log(`User: ${this.Name} waits for`);
        return cy.wait(waitsFor);
    }

    asksMany(manyQuestions: any[]) {
        // console.log(`User: ${this.Name} asks many`);
        manyQuestions.forEach(question => question.answeredBy(this));
    }
}