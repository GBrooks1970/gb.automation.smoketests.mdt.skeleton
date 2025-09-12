import { TopazUser } from "cypress/support/screenplay/actors/TopazUser";
import { EnvDataUtil } from "../env/EnvDataUtil";

let envData = new EnvDataUtil();
export const TOPAZ_PROC_fromDefault_USER: TopazUser = TopazUser.fromDefault(envData);
export const TOPAZ_PROC_A_USER: TopazUser = TopazUser.fromUserIndex(envData, 2);
export const TOPAZ_PROC_B_USER: TopazUser = TopazUser.fromUserIndex(envData, 1);