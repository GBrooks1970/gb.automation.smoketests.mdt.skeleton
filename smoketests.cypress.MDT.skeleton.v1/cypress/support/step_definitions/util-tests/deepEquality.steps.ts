import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import { deepEqual } from "../../utils/deepEqual-util"; 
import { UserData } from "cypress/support/utils/env/UserData";

import CommonUtils from '../../utils/common-utils';

let obj1: any;
let obj2: any;
let isEqual: boolean;

Given("I have two identical JSON objects", () => {
    obj1 = {
        a: 1,
        b: {
            c: 2,
            d: [3, 4]
        }
    };
    obj2 = {
        a: 1,
        b: {
            c: 2,
            d: [3, 4]
        }
    };
});

Given("I have two other identical JSON objects", () => {
    obj1 = {
        a: {
            b: 1,
            c: {
                d: [2, 3, { e: 4 }],
                f: "hello",
            },
        },
        g: null,
    };

    obj2 = {
        a: {
            b: 1,
            c: {
                d: [2, 3, { e: 4 }],
                f: "hello",
            },
        },
        g: null,
    };
});


Given("I have two different JSON objects", () => {
    obj1 = {
        a: 1,
        b: {
            c: 2,
            d: [3, 4]
        }
    };
    obj2 = {
        a: 1,
        b: {
            c: 3,
            d: [3, 5]  // Different value here
        }
    };
});

Given("I have two identical created JSON objects", () => {   
    let userData: UserData =  {
        username: "UCAS Admin User",
        email: "bbtsuperuser@ucas.ac.uk",
        password: "F1ndMyBugz!",
        passwordChange: "UCASpa$$w0rd002!",
        userType: "UCAS"
    };
    obj1 = userData;
    obj2 = userData;
});

When("I compare them for deep equality", () => {
    isEqual = deepEqual(obj1, obj2, true);
});

Then("they should be considered deeply equal", () => {
    expect(isEqual).to.be.true;
});

Then("they should not be considered deeply equal", () => {
    expect(isEqual).to.be.false;
});


Given("I have two JSON objects with identical Date properties", () => {
    const currentDate = new Date();    
    const date1 = currentDate;
    const date2 = currentDate;
    obj1 = {
        date: currentDate,
        datestring: date1.toISOString(),
        info: "Some info"
    };
    obj2 = {
        date: currentDate,
        datestring: date2.toISOString(),
        info: "Some info"
    };
});

Given("I have two JSON objects with different Date properties", () => {
    const date1 = new Date(2022, 1, 1);
    const date2 = new Date(2023, 1, 1);
    obj1 = {
        date: date1,
        datestring: date1.toISOString(),
        info: "Info for obj1"
    };
    obj2 = {
        date: date2,
        datestring: date1.toISOString(),
        info: "Info for obj2"
    };
});

Given("I have two JSON objects with special characters in their values", () => {
    obj1 = {
        message: "Hello!@#$%^&*()_+=-[]{}|;'<>?,./:\"\\",  // String with special characters
        info: "Regular Info"
    };
    obj2 = {
        message: "Hello!@#$%^&*()_+=-[]{}|;'<>?,./:\"\\",  // Same string with special characters
        info: "Regular Info"
    };
});