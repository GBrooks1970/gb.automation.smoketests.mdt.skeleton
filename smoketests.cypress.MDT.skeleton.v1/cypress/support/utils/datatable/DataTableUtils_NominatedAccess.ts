import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { PickleTable, PickleTableCell, PickleTableRow, DataTableUtils } from './DataTableUtils';
import CommonUtils from '../common-utils';
import { ThirdPartyDetails } from '../env/ApplyData';

let dataTable: PickleTable;
let nominatedAccessDataTable: Record<string, any>[];
let constructedCypressdataTable: DataTable;

export class DataTableUtils_NominatedAccess {

    private static CreateBasicDataTable(thirdPartyDetails: ThirdPartyDetails): DataTable {
        dataTable = {
            rows: [
                {
                    cells: [{ value: "Full Name" }, { value: "Relationship" }],
                },
                {
                    cells: [{ value: thirdPartyDetails.Name }, { value: thirdPartyDetails.Relationship }],
                },
            ],
        };
        return new DataTable(dataTable);
    }

    static NominatedAccess(thirdPartyDetails: ThirdPartyDetails) {
        constructedCypressdataTable = this.CreateBasicDataTable(thirdPartyDetails);
        nominatedAccessDataTable = DataTableUtils.ConvertToIndexedObject(dataTable);
        cy.log(CommonUtils.toJSONString(nominatedAccessDataTable));
        return constructedCypressdataTable;
    };
};