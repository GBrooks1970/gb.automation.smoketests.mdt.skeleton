import { faker } from "@faker-js/faker";
import { BaseAddress, BFPOAddress, UkAddress, UkAddressWithCountry } from "../../env/Address";

// Address.ts Generators

export const generateRandomBaseAddress = (empty: boolean = false): BaseAddress => ({
    AddressLines: empty ?
        Array.from({ length: 4 }, () => "")
        :
        Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.location.streetAddress())

});

export const generateRandomUkAddress = (empty: boolean = false): UkAddress => ({
    ...generateRandomBaseAddress(empty),
    PostCode: empty ? "" : faker.location.zipCode("??## #??"),
});

export const generateRandomBFPOAddress = (empty: boolean = false): BFPOAddress => ({
    ...generateRandomBaseAddress(empty),
    BFPONumber: empty ? "" : `BFPO ${faker.number.int({ min: 1, max: 999 })}`,
});

export const generateRandomUkAddressWithCountry = (empty: boolean = false): UkAddressWithCountry => ({
    ...generateRandomUkAddress(empty),
    Country: empty ? "" : faker.location.country(),
});


//Random collection generators
export const generateMultipleRandomUkAddresses = (number: number = 5): UkAddress[] => {
    return faker.helpers.multiple( () => generateRandomUkAddress(), {
        count: number,
    })
};


export const createUkAddress = <T extends Partial<UkAddress>>(initialValues: T): UkAddress & T => {
    return Object.assign(generateRandomUkAddress(true), initialValues);
};
