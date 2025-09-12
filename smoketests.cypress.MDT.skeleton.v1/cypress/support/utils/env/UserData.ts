export interface BaseUserData {
  username: string;
  password: string;
};

export interface UserData extends BaseUserData {
  email: string;
  passwordChange: string;
  userType: string;
};

export let EmptyUserData: UserData = {
  username: '',
  email: '',
  password: '',
  passwordChange: '',
  userType: '',
};

export interface TopazUserData extends BaseUserData {
};

export let EmptyTopazUserData: TopazUserData = {
  username: 'defaultUsername',
  password: 'defaultPassword',
};