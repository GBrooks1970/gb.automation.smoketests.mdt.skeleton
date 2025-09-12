import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { DataPickerUtil } from 'cypress/support/utils/DataPickerUtil';
import { UserData } from 'cypress/support/utils/env/UserData';

let dataPicker: DataPickerUtil<unknown>;
let selectedMember: any;

Given('a DataPickerUtil instance with members {string}, {string}, and {string}', (member1, member2, member3) => {
    dataPicker = new DataPickerUtil([member1, member2, member3]);
});
Given('a DataPickerUtil instance with members {string}, {string}, {string}, and {string}', (member1, member2, member3, member4) => {
    dataPicker = new DataPickerUtil([member1, member2, member3, member4]);
});

When('I get a random member without repetition', () => {
    selectedMember = dataPicker.getRandomMemberWithoutRepetition();
});

Then('the member should be one of {string}, {string}, or {string}', (member1, member2, member3) => {
    expect([member1, member2, member3]).to.include(selectedMember);
});

Then('the member should not be available for future selections', () => {
    expect(Array.from(dataPicker.availableMembers_Set)).to.not.include(selectedMember);
});

When('I get the next member without repetition', () => {
    selectedMember = dataPicker.getNextMemberWithoutRepetition();
});

Then('the member should be {string}', (expectedMember) => {
    expect(selectedMember).to.equal(expectedMember);
});

Given('a DataPickerUtil instance with no available members', () => {
    dataPicker = new DataPickerUtil([]);
});

When('I try to get a member', () => {
    try {
        selectedMember = dataPicker.getRandomMemberWithoutRepetition();
    } catch (error) {
        if (error instanceof Error) {
            selectedMember = error.message;
        } else {
            selectedMember = 'getRandomMemberWithoutRepetition : availableMembers is empty';
        }
    }
});

Then('an error should be thrown', () => {
    expect(selectedMember).to.equal('getRandomMemberWithoutRepetition : availableMembers is empty');
});

When('I get a random member with a filter excluding {string}', (excludedMember) => {
    selectedMember = dataPicker.getRandomMemberWithoutRepetition(member => member !== excludedMember);
});

Then('the selected member should not be {string}', (excludedMember) => {
    expect(selectedMember).to.not.equal(excludedMember);
});

When('I get the next member with a filter excluding {string}', (excludedMember) => {
    selectedMember = dataPicker.getNextMemberWithoutRepetition(member => member !== excludedMember);
});

Given('a DataPickerUtil instance with a collection of UserData variables', () => {
    const users: UserData[] = [
        { username: 'Alice', password: 'pass1', email: 'alice@example.com', passwordChange: 'yes', userType: 'UCAS' },
        { username: 'Bob', password: 'pass2', email: 'bob@example.com', passwordChange: 'no', userType: 'Admin' },
        { username: 'Charlie', password: 'pass3', email: 'charlie@example.com', passwordChange: 'yes', userType: 'UCAS' },
        { username: 'Dan', password: 'Spurs0', email: 'Dan@tautism.com', passwordChange: 'NeedMoreMoney', userType: 'LittleClub' },
        { username: 'Arsene', password: 'Gunners1', email: 'Arsene@tautism.com', passwordChange: 'WonMoreTrophies', userType: 'BigClub' },
        { username: 'Jurgen', password: 'Koppite2', email: 'Jurgen@tautism.com', passwordChange: 'YNWA', userType: 'BigClub' }
    ];
    dataPicker = new DataPickerUtil(users);
});

When('I get a random UserData member with a filter for userType "BigClub"', () => {
    selectedMember = dataPicker.getRandomMemberWithoutRepetition(filterByUserTypeFn('BigClub'));
});

Then('the selected member should have userType "BigClub"', () => {
    expect(selectedMember.userType).to.equal('BigClub');
});

function filterByUserTypeFn(f:string): ((member: unknown) => boolean) | undefined {
    return (user) => (user as UserData).userType === f;
}
