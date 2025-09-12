import { FieldDetail_Assert } from "./FieldDetail_Base";
import { FieldDetailsUtils } from "./FieldDetailsUtils";
import { User } from "cypress/support/screenplay/actors/User";
import CommonUtils from "cypress/support/utils/common-utils";

export class AssertPageFieldDetails {
  user: User;
  constructor(user: User) {
    this.user = user;
  };

  usingFieldDetailsAndRecordData(
    recordData: Record<string, string>, fieldDetails: FieldDetail_Assert[]) {

    cy.log(`Assert Record Data: ${CommonUtils.toJSONString(recordData)}`);
    cy.log(`Field Details: ${CommonUtils.toJSONString(fieldDetails)}`);

    return {
      answeredBy: () => {
        fieldDetails.forEach((fieldDetail_Action) => {

          let action_fieldValue: string;

          if (!fieldDetail_Action.Name) {
            throw new Error(`Incomplete fieldDetails. Name not provided.`);
          };

          if (!(fieldDetail_Action.Name in recordData)) {
            cy.log(`No Action - Field Name: ${fieldDetail_Action.Name} has no equivalent property  in Record Data`);
          } else {
            cy.log(`Field Name: ${fieldDetail_Action.Name} Action Value : ${recordData?.[fieldDetail_Action.Name]}`);
            action_fieldValue = `${recordData?.[fieldDetail_Action.Name]}`;

            if ( !fieldDetail_Action.AssertionProcess
              || !fieldDetail_Action.AssertionTarget
              || !fieldDetail_Action.Selector
              || !fieldDetail_Action.AssertionType
            ) {
              throw new Error(`
              Incomplete fieldDetails : ${fieldDetail_Action.Name}. 
              FieldDetail_Assert: ${CommonUtils.toJSONString(fieldDetail_Action)}
              `);
            };

            let fieldDetailsUtil = new FieldDetailsUtils(this.user);
            this.user.asks(fieldDetailsUtil.assertFieldValue(fieldDetail_Action, action_fieldValue, true));
          };
        });
      }
    };
  };
};