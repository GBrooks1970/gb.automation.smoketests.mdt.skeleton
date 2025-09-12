import { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { PickleTable, PickleTableCell, PickleTableRow, DataTableUtils } from './DataTableUtils';
import CommonUtils from '../common-utils';
import { TopazApplicant } from "../env/TopazData_TopazApplicant";

let dataTable: PickleTable;
let updateValidReferenceDetailsDataTable: Record<string, any>[];
let constructedCypressdataTable: DataTable;

export class DataTableUtils_ReferenceDetails {

    private static CreateBasicDataTable(topazApplicant: TopazApplicant): DataTable {
        dataTable = {
            rows: [
                {
                    cells: [
                        { value: "Name" },
                        { value: "Post" },
                        { value: "Organisation" },
                        { value: "Address Line 1" },
                        { value: "Address Line 2" },
                        { value: "Address Line 3" },
                        { value: "Address Line 4" },
                        { value: "Postcode" },
                        { value: "Telephone" },
                        { value: "Fax" },
                        { value: "Email" }
                    ],
                },
                {
                    cells: [
                        { value: topazApplicant.ReferenceDetails.RefereeName },
                        { value: topazApplicant.ReferenceDetails.Post },
                        { value: topazApplicant.ReferenceDetails.Organisation },
                        { value: topazApplicant.ReferenceDetails.Address.AddressLines[0] },
                        { value: topazApplicant.ReferenceDetails.Address.AddressLines[1] },
                        { value: topazApplicant.ReferenceDetails.Address.AddressLines[2] },
                        { value: topazApplicant.ReferenceDetails.Address.AddressLines[3] },
                        { value: topazApplicant.ReferenceDetails.Address.PostCode },
                        { value: topazApplicant.ReferenceDetails.Telephone },
                        { value: topazApplicant.ReferenceDetails.Fax },
                        { value: topazApplicant.ReferenceDetails.Email }
                    ],
                },
            ],
        };
        return new DataTable(dataTable);
    }

    static ReferenceDetailsDataTable(topazApplicant: TopazApplicant) {
        constructedCypressdataTable = this.CreateBasicDataTable(topazApplicant);
        updateValidReferenceDetailsDataTable = DataTableUtils.ConvertToIndexedObject(dataTable);
        cy.log(CommonUtils.toJSONString(updateValidReferenceDetailsDataTable));
        return constructedCypressdataTable;
    };
};