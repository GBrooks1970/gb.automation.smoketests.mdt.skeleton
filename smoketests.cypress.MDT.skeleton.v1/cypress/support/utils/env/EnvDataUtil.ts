import { EnvDataUtil_Base } from './EnvDataUtil_Base';
import { EnvDataUtil_TopazData } from './EnvDataUtil_TopazData';
import { EnvDataUtil_UserData } from './EnvDataUtil_UserData';
import { EnvDataUtil_ApplyData } from './EnvDataUtil_ApplyData';
import { EnvDataUtil_AdviserPortalData } from './EnvDataUtil_AdviserPortalData';
import { EnvDataUtil_EmployerData } from './EnvDataUtil_EmployerData';

export class EnvDataUtil extends EnvDataUtil_Base {
    constructor() {
        super();
    };
    public users = new EnvDataUtil_UserData(this.data);
    public topazData = new EnvDataUtil_TopazData();
    public employerData = new EnvDataUtil_EmployerData();
    public applyData = new EnvDataUtil_ApplyData();
    public adviserPortalData = new EnvDataUtil_AdviserPortalData();
};