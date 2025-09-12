import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { UserData } from "cypress/support/utils/env/UserData";
import { PlaceOfEducation } from "cypress/support/utils/env/ApplyData";
import { DataPickerUtil } from '../../../utils/DataPickerUtil';
import CommonUtils from '../../../utils/common-utils';


let initialUserMembers: UserData[];
let selectedUserMembers: Set<string> = new Set();
let selectedUserMembers_Array: string[];

let initialPOEMembers: PlaceOfEducation[];
let selectedPOEMembers: Set<string> = new Set();
let selectedPOEMembers_Array: string[];

let envData = new EnvDataUtil();

let userDataPicker: DataPickerUtil<UserData>;
let placeOfEducationDataPicker: DataPickerUtil<PlaceOfEducation>;
let maxUserCount: number;
let maxPOECount: number;

let currentUser: UserData;
let setupStepExecuted_Users001 = false; // Flag to track if setup step has been executed
let setupStepExecuted_Users002 = false; // Flag to track if setup step has been executed

let currentPOE: PlaceOfEducation;
let setupStepExecuted_POE = false; // Flag to track if setup step has been executed

// Before hook to conditionally run the Before step
Before({ tags: "@runBeforeHook" }, () => {
  // Perform actions or setup that should run before the scenario
  cy.log("Before - Running Before step for @runBeforeHook scenario");
});

Before({ tags: "@runBeforeHook_SetUserList_OnlyOnce_DATA-PICKER-002" }, () => {
  // Perform actions or setup that should run before the scenario
  cy.log("Before - Running Before step for @runBeforeHook_SetUserList_OnlyOnce_DATA-PICKER-002 scenario");

  if (!setupStepExecuted_Users001) {
    // Run the setup step only once
    cy.log("Running setup step...");
    setupStepExecuted_Users001 = true; // Set the flag to indicate setup step has been executed

    initialUserMembers = envData.users.getAllUsers();

    maxUserCount = initialUserMembers.length;

    userDataPicker = new DataPickerUtil(initialUserMembers);

    selectedUserMembers.clear(); // Resetting the set for new test run
    selectedUserMembers_Array = [];
  };
});

Before({ tags: "@runBeforeHook_SetUserList_OnlyOnce_DATA-PICKER-006" }, () => {
  // Perform actions or setup that should run before the scenario
  cy.log("Before - Running Before step for @runBeforeHook_SetUserList_OnlyOnce_DATA-PICKER-006 scenario");

  if (!setupStepExecuted_Users002) {
    // Run the setup step only once
    cy.log("Running setup step...");
    setupStepExecuted_Users002 = true; // Set the flag to indicate setup step has been executed

    initialUserMembers = envData.users.getAllUsers();

    maxUserCount = initialUserMembers.length;

    userDataPicker = new DataPickerUtil(initialUserMembers);

    selectedUserMembers.clear(); // Resetting the set for new test run
    selectedUserMembers_Array = [];
  };
});

Before({ tags: "@runBeforeHook_SetPOEList_OnlyOnce_DATA-PICKER-004" }, () => {
  // Perform actions or setup that should run before the scenario
  cy.log("Before - Running Before step for @runBeforeHook_SetPOEList_OnlyOnce_DATA-PICKER-004 scenario");

  if (!setupStepExecuted_POE) {
    // Run the setup step only once
    cy.log("Running setup step...");
    setupStepExecuted_POE = true; // Set the flag to indicate setup step has been executed

    initialPOEMembers = envData.applyData.getAllPlacesOfEducation();

    maxPOECount = initialPOEMembers.length;

    placeOfEducationDataPicker = new DataPickerUtil(initialPOEMembers);

    selectedPOEMembers.clear(); // Resetting the set for new test run
    selectedPOEMembers_Array = [];
  };
});

Given('there is a list of users', () => {
  initialUserMembers = envData.users.getAllUsers();

  maxUserCount = initialUserMembers.length;

  userDataPicker = new DataPickerUtil(initialUserMembers);

  selectedUserMembers.clear(); // Resetting the User set for new test run
  selectedUserMembers_Array = [];
});

Given('there is a list of places of education', () => {
  initialPOEMembers = envData.applyData.getAllPlacesOfEducation();

  maxPOECount = initialPOEMembers.length;

  placeOfEducationDataPicker = new DataPickerUtil(initialPOEMembers);

  selectedPOEMembers.clear(); // Resetting the User set for new test run
  selectedPOEMembers_Array = [];
});

Given('I display the initial list of users', () => {
  cy.log(`1 : availableMembers: ${CommonUtils.toJSONString([...userDataPicker.availableMembers_Set])}`);
  cy.log(`1 : availableMembers count: ${userDataPicker.availableMembers_Set.size}`);
  cy.log(`1 : maxUserCount: ${maxUserCount}`);

});

Given('I display the initial list of places of education', () => {
  cy.log(`1 : availableMembers: ${CommonUtils.toJSONString([...placeOfEducationDataPicker.availableMembers_Set])}`);
  cy.log(`1 : availableMembers count: ${placeOfEducationDataPicker.availableMembers_Set.size}`);
  cy.log(`1 : maxPOECount: ${maxPOECount}`);

});

When('I request a random user multiple times - users list count times', () => {
  // Assuming maxUserCount is users initial list count.
  let currentUser: UserData;
  for (let i = 0; i < maxUserCount; i++) {
    currentUser = userDataPicker.getRandomMemberWithoutRepetition();
    selectedUserMembers.add(currentUser.username);
    selectedUserMembers_Array.push(currentUser.username);
  }

  cy.log(`END :Selected Users: ${CommonUtils.toJSONString([...userDataPicker.selectedMembers_Set])}`);
});


When('I request the user next in list multiple times - users list count times', () => {
  // Assuming maxUserCount is users initial list count.
  let currentUser: UserData;
  for (let i = 0; i < maxUserCount; i++) {
    currentUser = userDataPicker.getNextMemberWithoutRepetition();
    selectedUserMembers.add(currentUser.username);
    selectedUserMembers_Array.push(currentUser.username);
  }

  cy.log(`END :Selected Users: ${CommonUtils.toJSONString([...userDataPicker.selectedMembers_Set])}`);
});

When('I request a random place of education multiple times - POE list count times', () => {
  // Assuming maxPOECount is POE initial list count.
  let currentPOE: PlaceOfEducation;
  for (let i = 0; i < maxPOECount; i++) {
    currentPOE = placeOfEducationDataPicker.getRandomMemberWithoutRepetition();
    selectedPOEMembers.add(currentPOE.Name);
    selectedPOEMembers_Array.push(currentPOE.Name);
  }

  cy.log(`END :Selected Places of Education: ${CommonUtils.toJSONString([...placeOfEducationDataPicker.selectedMembers_Set])}`);
});

Then('each user should be unique', () => {
  expect(selectedUserMembers_Array.length).to.eq(maxUserCount);
  expect(new Set(selectedUserMembers_Array).size).to.eq(selectedUserMembers.size);
});

Then('each POE should be unique', () => {
  expect(selectedPOEMembers_Array.length).to.eq(maxPOECount);
  expect(new Set(selectedPOEMembers_Array).size).to.eq(selectedPOEMembers.size);
});

Then('each requested user should be unique', () => {
  expect(userDataPicker.selectedMembers_Set.size).to.eq(selectedUserMembers.size);
});

Then('each requested POE should be unique', () => {
  expect(placeOfEducationDataPicker.selectedMembers_Set.size).to.eq(selectedPOEMembers.size);
});

When("I request a {string} user", (randomvaliduser: string) => {
  // Use the random user picker to get user not selected before
  if (randomvaliduser === "[VALID]") {
    currentUser = userDataPicker.getRandomMemberWithoutRepetition();
  }
  else {
    currentUser = userDataPicker.getRandomMemberWithoutRepetition();
  }
  selectedUserMembers.add(currentUser.username);
  selectedUserMembers_Array.push(currentUser.username);
  cy.log(`selectedMembers:${CommonUtils.toJSONString(selectedUserMembers)} `);
});

When("I request the next {string} user", (validuser: string) => {
  // Use the random user picker to get user not selected before
  if (validuser === "[VALID]") {
    currentUser = userDataPicker.getNextMemberWithoutRepetition();
  }
  else {
    currentUser = userDataPicker.getNextMemberWithoutRepetition();
  }
  selectedUserMembers.add(currentUser.username);
  selectedUserMembers_Array.push(currentUser.username);
  cy.log(`selectedMembers:${CommonUtils.toJSONString(selectedUserMembers)} `);
});

When("I request a {string} POE", (randomvalidPOE: string) => {
  // Use the random data picker to get POE not selected before
  if (randomvalidPOE === "[VALID]") {
    currentPOE = placeOfEducationDataPicker.getRandomMemberWithoutRepetition();
  }
  else {
    currentPOE = placeOfEducationDataPicker.getRandomMemberWithoutRepetition();
  }
  selectedPOEMembers.add(currentPOE.Name);
  selectedPOEMembers_Array.push(currentPOE.Name);
  cy.log(`selectedPOEMembers:${CommonUtils.toJSONString(selectedPOEMembers)} `);
});