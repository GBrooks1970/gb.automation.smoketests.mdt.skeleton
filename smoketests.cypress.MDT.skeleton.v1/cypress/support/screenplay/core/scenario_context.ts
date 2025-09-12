import { User } from "cypress/support/screenplay/actors/User";
import { DataPickerUtil } from "cypress/support/utils/DataPickerUtil";
import { TopazUser } from "../actors/TopazUser";
import { TopazApplicant } from "cypress/support/utils/env/TopazData_TopazApplicant";
import { ScenarioUtils } from "./ScenarioUtils";


export type scenario_context<dataType> = {
    dataPickerUtil?: DataPickerUtil<dataType>;
    setup: boolean;
    User: User;
};

export type scenario_context_topaz<dataType> = {
    dataPickerUtil?: DataPickerUtil<dataType>;
    setup: boolean;
    User: TopazUser;
    TopazApplicant?: TopazApplicant;
};

export class GlobalTestData {
    Scenario_context!: Record<string, scenario_context<any>>;
    Topaz_Scenario_context!: Record<string, scenario_context_topaz<any>>;
    tags!: string[];
}


