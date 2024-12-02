import {Role} from '../userRoles';

export type GetCompanyUserResponseData = {
    role: Role;
    baseUserId: string;
    companyId: string;
};
