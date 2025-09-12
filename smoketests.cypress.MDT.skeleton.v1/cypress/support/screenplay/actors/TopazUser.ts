import { EnvDataUtil } from 'cypress/support/utils/env/EnvDataUtil';
import { TopazUserData, EmptyTopazUserData, UserData } from "cypress/support/utils/env/UserData";
import CommonUtils from '../../utils/common-utils';
import { User } from './User';

export class TopazUser extends User {
    topazUserData!: TopazUserData;

    constructor(Name: string, topazUserData?: TopazUserData) {
        super(Name);
        //If userDate passed in use that data - if not use the default data
        this.topazUserData = topazUserData ? topazUserData : EmptyTopazUserData;
    };

    static named(Name: string) {
        return new TopazUser(Name);
    };

    static namedWithUserData(Name: string, userData: TopazUserData) {
        let user = new TopazUser(Name);
        user.topazUserData = userData;
        return user;
    }

    static fromDefault(envData: EnvDataUtil): TopazUser {
        // Initialize the User object with some predefined UserData
        let topazUserData = EmptyTopazUserData;

        //Get data from fixture file - if it exists
        let foundTopazUserData = envData.topazData.getTopazUserDefault();
        //If found use that data - if not use the default data
        if (foundTopazUserData)
            topazUserData = foundTopazUserData;

        console.log(`User fromDefault userData: ${CommonUtils.toJSONString(topazUserData,{escaped:true})}`);
        return new TopazUser(topazUserData.username, topazUserData);
    };

    static fromUserIndex(envData: EnvDataUtil, index: number = 0): TopazUser {
        // Initialize the User object with some predefined UserData
        let topazUserData = EmptyTopazUserData;

        //Get data from fixture file - if it exists
        let foundTopazUserData = envData.topazData.getTopazUserByIndex(index);
        //If found use that data - if not use the default data
        if (foundTopazUserData)
            topazUserData = foundTopazUserData;

        console.log(`User fromUserIndex userData: ${CommonUtils.toJSONString(topazUserData,{escaped:true})}`);
        return new TopazUser(topazUserData.username, topazUserData);
    };
};