import CommonUtils from "cypress/support/utils/common-utils";
import { FieldDetailsUtils } from "./FieldDetailsUtils";
import { FieldDetail_Input } from "./FieldDetail_Base";
import { User } from "../actors/User";

export class InputPageFieldDetails {
  user: User;
  constructor(user: User) {
      this.user = user;
  };


  usingFieldDetailsAndRecordData(
    recordData: Record<string, string>, fieldsDetails: FieldDetail_Input[]) {

    cy.log(`Input Record Data: ${CommonUtils.toJSONString(recordData)}`);
    cy.log(`Field Details: ${CommonUtils.toJSONString(fieldsDetails)}`);

    return {
      performAs: () => {
        fieldsDetails.forEach((fieldDetail_Action) => {

          let action_fieldValue: string;

          if (!fieldDetail_Action.Name) {
            throw new Error(`Incomplete fieldDetails : Field Name not provided `);
          }

          if (!(fieldDetail_Action.Name in recordData)) {
            cy.log(`No Action - Field Name: ${fieldDetail_Action.Name} has no equivalent property in Record Data`);
          } else {
            cy.log(`Field Name: ${fieldDetail_Action.Name} Action Value : ${recordData?.[fieldDetail_Action.Name]}`);
            action_fieldValue = `${recordData?.[fieldDetail_Action.Name]}`;

            if (!fieldDetail_Action.InputType
              || !fieldDetail_Action.ValueType) {
              throw new Error(`
              Incomplete fieldDetails : ${fieldDetail_Action.Name}. 
              fieldDetail_Action: ${CommonUtils.toJSONString(fieldDetail_Action)}
              `);
            };

            let fieldDetailsUtil = new FieldDetailsUtils(this.user);
            this.user.attemptsTo(fieldDetailsUtil.inputFieldValue(fieldDetail_Action, action_fieldValue, true));
          }
        });
      }
    };
  };


};