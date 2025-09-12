import { UkAddress, UkAddressWithCountry } from "../env/Address";

// Example structure of UkAddress
export const TestData_UkAddress_01: UkAddress = {
    AddressLines: ["123 Street", "City", "State", "Country"],
    PostCode: "AB12CD",
};
// Example structure of UkAddressWithCountry
export const TestData_UkAddressWithCountry: UkAddressWithCountry = {
    AddressLines: ["123 Street", "City", "State"],
    PostCode: "AB12CD",
    Country: "Country"
};
