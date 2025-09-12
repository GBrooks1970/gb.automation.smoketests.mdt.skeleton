import CommonUtils from './common-utils';

export class DataPickerUtil<dataType> {
    availableMembers_Set: Set<dataType> = new Set();
    selectedMembers_Set: Set<dataType> = new Set();

    constructor(Members: dataType[]) {
        if (Members) {
            this.availableMembers_Set = new Set(Members);
            this.selectedMembers_Set.clear(); // Resetting the set for new test run     
        };
    };

    /**
     * Resets the selected members, making all members available again.
     */
    reset(): void {
        this.availableMembers_Set = new Set([...this.availableMembers_Set, ...this.selectedMembers_Set]);
        this.selectedMembers_Set.clear();
        cy.log(`resetAvailableMembers : availableMembers:${CommonUtils.toJSONString([...this.availableMembers_Set])}`);
    };

    /**
     * Get a random member without repetition. Optionally applies a filter function.
     * @param filterFn - Optional filter function to refine available members.
     * @returns A randomly selected member or null if none are available.
     */
    getRandomMemberWithoutRepetition(filterFn?: (member: dataType) => boolean): dataType /*| null*/ {
        if (!this.availableMembers_Set) {
            throw new Error(`${this.getRandomMemberWithoutRepetition.name} : availableMembers is undefined`);
        }
        if (this.availableMembers_Set.size === 0) {
            throw new Error(`${this.getRandomMemberWithoutRepetition.name} : availableMembers is empty`);
        }
        
        let filteredMembers = Array.from(this.availableMembers_Set);

        if (filterFn) {
            console.log(`${this.getRandomMemberWithoutRepetition.name} : filterFn used`);
            filteredMembers = filteredMembers.filter(filterFn);
            console.log(`${this.getRandomMemberWithoutRepetition.name} : filteredMembers ${filteredMembers.length}`);
        }

        if (filteredMembers.length === 0) {
            throw new Error(`${this.getRandomMemberWithoutRepetition.name} : filteredMembers is empty`);
        }

        const randomIndex = Math.floor(Math.random() * filteredMembers.length);
        const selectedMember = filteredMembers[randomIndex];

        // Remove selected member from availableMembers and add to selectedMembers
        this.availableMembers_Set.delete(selectedMember);
        this.selectedMembers_Set.add(selectedMember);

        console.log(`selectedMember:${selectedMember}`);
        return selectedMember;
    }

    /**
     * Get the next available member without repetition. Optionally applies a filter function.
     * @param filterFn - Optional filter function to refine available members.
     * @returns The next selected member or null if none are available.
     */
    getNextMemberWithoutRepetition(filterFn?: (member: dataType) => boolean): dataType /*| null*/ {
        if (!this.availableMembers_Set) {
            throw new Error(`${this.getRandomMemberWithoutRepetition.name} : availableMembers is undefined`);
        }
        if (this.availableMembers_Set.size === 0) {
            throw new Error(`${this.getRandomMemberWithoutRepetition.name} : availableMembers is empty`);
        }

        let filteredMembers = Array.from(this.availableMembers_Set);

        if (filterFn) {
            console.log(`${this.getNextMemberWithoutRepetition.name} : filterFn used`);
            filteredMembers = filteredMembers.filter(filterFn);
            console.log(`${this.getNextMemberWithoutRepetition.name} : filteredMembers ${filteredMembers.length}`);
        }

        if (filteredMembers.length === 0) {
            throw new Error(`${this.getNextMemberWithoutRepetition.name} : filteredMembers is empty`);
        }

        const selectedMember = filteredMembers[0]; // Pick the first available member

        // Remove selected member from availableMembers and add to selectedMembers
        this.availableMembers_Set.delete(selectedMember);
        this.selectedMembers_Set.add(selectedMember);

        return selectedMember;
    }
}