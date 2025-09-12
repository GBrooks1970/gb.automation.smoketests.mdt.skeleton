import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import CommonUtils from '../common-utils';
import { DataTableUtils, PickleTable } from './DataTableUtils';
import { BFPOAddress, BaseAddress, NonUKAddressWithCountryCode, UkAddress } from '../env/Address';

let dataTable: PickleTable;
let UKAddressDataTable: Record<string, any>[];
let nonUKAddressDataTable: Record<string, any>[];
let BFPOAddressDataTable: Record<string, any>[];
let constructedCypressdataTable: DataTable;

export class DataTableUtils_Address {

  private static creteOtherAddressItem(Title: string, Value: string): { Title: string, Value: string } {
    return { Title: Title, Value: Value }
  }

  private static CreateBasicDataTable(address: BaseAddress, otherAddressItem: { Title: string, Value: string }): DataTable {
    dataTable = {
      rows: [
        {
          cells: [
            { value: "Address Line 1" },
            { value: "Address Line 2" },
            { value: "Address Line 3" },
            { value: "Address Line 4" },
            { value: otherAddressItem.Title },
          ],
        },
        {
          cells: [
            { value: address.AddressLines[0] },
            { value: address.AddressLines[1] },
            { value: address.AddressLines[2] },
            { value: address.AddressLines[3] },
            { value: otherAddressItem.Value }
          ],
        },
      ],
    };
    return new DataTable(dataTable);
  }

  static UKAddress(address: UkAddress) {
    constructedCypressdataTable = this.CreateBasicDataTable(address, { Title: "Post Code", Value: address.PostCode });
    UKAddressDataTable = DataTableUtils.ConvertToIndexedObject(dataTable);
    console.log(CommonUtils.toJSONString(UKAddressDataTable));
    return constructedCypressdataTable;
  };

  static nonUKAddress(countryCodeRequired: boolean, address: NonUKAddressWithCountryCode) {
    let otherItem;

    if (countryCodeRequired === true) {
      otherItem = this.creteOtherAddressItem('Country Code', address.CountryCode);
    } else {
      otherItem = this.creteOtherAddressItem('Country', address.Country);
    };

    constructedCypressdataTable = this.CreateBasicDataTable(address, { Title: otherItem.Title, Value: otherItem.Value });
    nonUKAddressDataTable = DataTableUtils.ConvertToIndexedObject(dataTable);
    cy.log(CommonUtils.toJSONString(nonUKAddressDataTable));
    return constructedCypressdataTable;
  };

  static BFPOAddress(address: BFPOAddress) {
    constructedCypressdataTable = this.CreateBasicDataTable(address, { Title: "BFPO Number", Value: address.BFPONumber });
    BFPOAddressDataTable = DataTableUtils.ConvertToIndexedObject(dataTable);
    cy.log(CommonUtils.toJSONString(BFPOAddressDataTable));
    return constructedCypressdataTable;
  };
};