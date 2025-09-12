import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { User } from '../../screenplay/actors/User';
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { UserData } from "cypress/support/utils/env/UserData";
import { DataPickerUtil } from '../../utils/DataPickerUtil';
import CommonUtils from '../../utils/common-utils';

import { deepEqual } from "../../utils/deepEqual-util";

let envData: EnvDataUtil = new EnvDataUtil();
let currentUser: User;
let dataPickerUtils: DataPickerUtil<UserData>;
let currentUserData: UserData;

let initialMembers: UserData[];
let selectedMembers: Set<string> = new Set();
let selectedMembers_Array: string[];
let selected_randomcurrentUserCount: number;

let maxUserCount: number;

let setupStepExecuted = false; // Flag to track if setup step has been executed

let isEqual: boolean;

const userData_InvalidUsername: UserData = { "username": "InvalidUsername", "email": "InvalidEmail@example.com", "password": "InvalidPassword", "passwordChange": "InvalidPasswordChange", "userType": "InvalidUserType" };
const userData_InvalidUsername_jsonstring: string = '{\"username\":\"InvalidUsername\",\"email\":\"InvalidEmail@example.com\",\"password\":\"InvalidPassword\",\"passwordChange\":\"InvalidPasswordChange\",\"userType\":\"InvalidUserType\"}';
const userData_UCASAdminUsername_jsonstring: string = '{\"username\":\"UCAS Admin User\",\"email\":\"bbtsuperuser@ucas.ac.uk\",\"password\":\"F1ndMyBugz!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"UCAS\"}';
const userData_UCASAdminUsername_jsonstring2: string = "{\"username\":\"UCAS Admin User\",\"email\":\"bbtsuperuser@ucas.ac.uk\",\"password\":\"F1ndMyBugz!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"UCAS\"}";
const uUserData_StudentuserType001: string = "{\"username\":\"Student.userType001\",\"email\":\"Student.userType001@gmail.com\",\"password\":\"UCASpa$$w0rd001!\",\"passwordChange\":\"UCASpa$$w0rd002!\",\"userType\":\"Student\"}";

Before({ tags: "@runBeforeHook_SetUserList_OnlyOnce_USER-FROMFIXTURE-004" }, () => {
    // Perform actions or setup that should run before the scenario
    cy.log("Before - Running Before step for @runBeforeHook_SetUserList_OnlyOnce_USER-FROMFIXTURE-004 scenario");

    if (!setupStepExecuted) {
        // Run the setup step only once
        cy.log("Running setup step...");
        setupStepExecuted = true; // Set the flag to indicate setup step has been executed

        initialMembers = envData.users.getAllUsers();

        maxUserCount = initialMembers.length;

        dataPickerUtils = new DataPickerUtil(initialMembers);

        selectedMembers.clear(); // Resetting the set for new test run
        selectedMembers_Array = [];
        selected_randomcurrentUserCount = 0;
    };
});

Given('I am a specific {string} User object created with fromFixture method', (username: string) => {
    currentUser = User.fromFixture(envData, username);
    currentUserData = currentUser.userData;
});

Given('I am a UCAS Admin User object created with fromFixture method', () => {
    let name = "UCAS Admin User";

    let userData: UserData = {
        username: "UCAS Admin User",
        email: "bbtsuperuser@ucas.ac.uk",
        password: "F1ndMyBugz!",
        passwordChange: "UCASpa$$w0rd002!",
        userType: "UCAS"
    };

    //currentUser = User.fromFixture(data, name);
    currentUser = new User(name, userData);

    currentUserData = currentUser.userData;
    cy.log(`currentUserData_JSONStringEscaped: ${CommonUtils.toJSONString(CommonUtils.toJSONString(currentUserData, { unformatted: false }))}`);
});

Given('I am a User object created without the fromFixture method', () => {
    let name = "Invalid User";
    let userData: UserData = {
        username: 'InvalidUsername',
        email: 'InvalidEmail@example.com',
        password: 'InvalidPassword',
        passwordChange: 'InvalidPasswordChange',
        userType: 'InvalidUserType',
    };
    cy.log(`userData_JSONStringEscaped: ${CommonUtils.toJSONString(CommonUtils.toJSONString(userData, { unformatted: false }))}`);
    currentUser = new User(name, userData);

    currentUserData = currentUser.userData;
});

Given("I create a {string} User object with fromFixture method", (randomvaliduser: string) => {
    maxUserCount = envData.users.getAllUsers().length;

    // Use the random user picker to get user not selected before
    let randomcurrentUser: UserData;
    if (randomvaliduser === "[VALID]") {
        randomcurrentUser = dataPickerUtils.getRandomMemberWithoutRepetition();
    }
    else {
        randomcurrentUser = dataPickerUtils.getRandomMemberWithoutRepetition();
    }

    selectedMembers.add(randomcurrentUser.username);
    selectedMembers_Array.push(randomcurrentUser.username);
    selected_randomcurrentUserCount++;
    currentUser = User.fromFixture(envData, randomcurrentUser.username);

    currentUserData = currentUser.userData;
});

When('I display The User credentials', () => {
    cy.log(`user userData: ${CommonUtils.toJSONString(currentUser.userData, { unformatted: false })}`);
    cy.log(`user credentials: ${CommonUtils.toJSONString(currentUser.userData?.email)}`);
    cy.log(`user credentials: ${CommonUtils.toJSONString(currentUser.userData?.password)}`);
});

Then('the UserData object fromFixture method should match this {string}', (expectedValue: string) => {
    cy.log(`expectedValue: ${expectedValue}`);

    // Use the parseJSON method to convert the string into an object
    let expectedValue_parseJSONObject = CommonUtils.parseJSON(expectedValue) as UserData;

    // Perform the comparison    
    isEqual = deepEqual(currentUserData, expectedValue_parseJSONObject, true);
});

Then("the two objects should be considered deeply equal", () => {
    expect(isEqual).to.be.true;
});

Then("the two objects should not be considered deeply equal", () => {
    expect(isEqual).to.be.false;
});

Then('the UserData object that is unique each time', () => {
    expect(selectedMembers_Array.length).to.eq(selected_randomcurrentUserCount, "selected_randomcurrentUserCount same as selectedMembers count");
    expect(new Set(selectedMembers_Array).size).to.eq(selectedMembers.size, "selectedMembers count unique");
    // expect(CommonUtils.getSetUnion(dataPickerUtils.selectedMembers_Set, dataPickerUtils.availableMembers_Set).size).to.eq(dataPickerUtils.initialMembers_Set.size, "getSetUnion");
    // expect(CommonUtils.getSetDifferences(dataPickerUtils.selectedMembers_Set, dataPickerUtils.initialMembers_Set).size).to.eq(0, "getSetDifferences");
});