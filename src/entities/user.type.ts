import {Roles} from 'src/user/userRoles';

export type UserData = {
    id?: string;
    login: string;
    password: string;
    phone: string;
    role: Roles;
};
