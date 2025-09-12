import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import CommonUtils from '../../../utils/common-utils';
import { Flatten } from "cypress/support/utils/flatten-util";
import { exampleParentComplexData } from "cypress/support/utils/examples/example-data-fixed";
import { ParentComplexData } from "cypress/support/utils/examples/example-data";
import { DataPickerUtil } from "cypress/support/utils/DataPickerUtil";

let parentComplexData: ParentComplexData;
let initialMembers: any[];
let selectedMembers: Set<string> = new Set();
let selectedMembers_Array: string[];


let memberDataPicker: DataPickerUtil<any>;
let maxMemberCount: number;

let setupStepExecuted_member = false; // Flag to track if setup step has been executed

// Before hook to conditionally run the Before step
Before({ tags: "@runBeforeHook" }, () => {
  // Perform actions or setup that should run before the scenario
  cy.log("Before - Running Before step for @runBeforeHook scenario");
});

Given('there is a ParentComplexData with multiple properties that are lists', () => {
  parentComplexData = exampleParentComplexData;

  cy.log(`ParentComplexData: ${CommonUtils.toJSONString(parentComplexData)}`);
});

Given('the ParentComplexData is flattened to generate a ComplexObjects List With Index', () => {
  //initialMembers = complexObjectsWithIndex;

  initialMembers = Flatten.ComplexObjectsToIndexedCompositeList_OrderBy_Size(
    parentComplexData.childComplexData.details,
    parentComplexData.childComplexData.places,
    parentComplexData.childComplexData.Qualifications,
  );

  cy.log(`ComplexObjects List With Index: ${CommonUtils.toJSONString(initialMembers)}`);
});



Given('the ParentComplexData is ramdomized and flattened to generate a ComplexObjects List With Index', () => {
  //initialMembers = complexObjectsWithIndex;

  initialMembers = Flatten.ComplexObjectsToIndexedCompositeList_Randomized(
    parentComplexData.childComplexData.details,
    parentComplexData.childComplexData.places,
    parentComplexData.childComplexData.Qualifications,
  );

  cy.log(`ComplexObjects List With Index: ${CommonUtils.toJSONString(initialMembers)}`);
});

Given('a DataPicker is created to iterate the ComplexObjects List With Index', () => {

  maxMemberCount = initialMembers.length;

  memberDataPicker = new DataPickerUtil(initialMembers);

  selectedMembers.clear(); // Resetting the member set for new test run
  selectedMembers_Array = [];
});

When('I request a random member multiple times - members list count times', () => {
  // Assuming maxMemberCount is members initial list count.
  let currentMember: any;
  for (let i = 0; i < maxMemberCount; i++) {
    currentMember = memberDataPicker.getRandomMemberWithoutRepetition();
    selectedMembers.add(currentMember.Index);
    selectedMembers_Array.push(currentMember.Index);
  }

  cy.log(`END :Selected Members: ${CommonUtils.toJSONString([...memberDataPicker.selectedMembers_Set])}`);
});

When('I request the next member in list multiple times - members list count times', () => {
  // Assuming maxMemberCount is members initial list count.
  let currentMember: any;
  for (let i = 0; i < maxMemberCount; i++) {
    currentMember = memberDataPicker.getNextMemberWithoutRepetition();
    selectedMembers.add(currentMember.Index);
    selectedMembers_Array.push(currentMember.Index);
  }

  cy.log(`END :Selected Members: ${CommonUtils.toJSONString([...memberDataPicker.selectedMembers_Set])}`);
});

Then('each member should be unique', () => {
  expect(selectedMembers_Array.length).to.eq(maxMemberCount);
  expect(new Set(selectedMembers_Array).size).to.eq(selectedMembers.size);
});