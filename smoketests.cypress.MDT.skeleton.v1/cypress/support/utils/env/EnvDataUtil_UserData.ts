import { EnvironmentData } from './EnvironmentData';
import { UsertypeLandingPage } from "./UserInfoData";
import { UserData, EmptyUserData } from "./UserData";

export class EnvDataUtil_UserData {
    protected data?: EnvironmentData;

    constructor(data: EnvironmentData) {
        this.data = data;
    };

    getUserDefault(): UserData {
        if (!this.data) {
            throw new Error(`${this.getUserDefault.name} : Data is undefined`);
        };
        return this.data.users.userdefault;
    };

    getUCASAdminUser(): UserData {
        if (!this.data) {
            throw new Error(`${this.getUCASAdminUser.name} : Data is undefined`);
        };
        return this.getUserByUsername('UCAS Admin User');
    };

    getUserByIndex(index: number): UserData {
        if (!this.data) {
            throw new Error(`${this.getUserByIndex.name} : Data is undefined`);
        };
        return this.data.users.userData[index];
    };

    getUserByUsername(username: string): UserData {
        if (!this.data) {
            throw new Error(`${this.getUserByUsername.name} : Data is undefined`);
        };
        let user = this.data.users.userData.find(user => user.username === username);
        if (!user)
            user = EmptyUserData;
        return user;
    };

    getUserByUserType(userType: string): UserData {
        if (!this.data) {
            throw new Error(`${this.getUserByUserType.name} : Users Data is undefined`);
        };
        let user = this.data.users.userData.find(user => user.userType === userType);
        if (!user)
            user = EmptyUserData;
        return user;
    };

    getAllUsers(): UserData[] {
        if (!this.data || !this.data.users) {
            throw new Error(`${this.getAllUsers.name} : Users Data is undefined`);
        };
        return this.data.users.userData;
    };

    getRandomUserData(): UserData {
        const allUsers = this.getAllUsers();
        const randomIndex = Math.floor(Math.random() * allUsers.length);
        return allUsers[randomIndex];
    };

    getUsertypeLandingPage(key: keyof UsertypeLandingPage): any {
        if (!this.data) {
            throw new Error(`${this.getUsertypeLandingPage.name} : UsertypeLandingPage is undefined`);
        };
        return this.data.users.usertypeLandingPage[key];
    };
};