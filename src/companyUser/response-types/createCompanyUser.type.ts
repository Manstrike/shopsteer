import {Role} from '../userRoles';

export type CreateCompanyUserResponseData = {
    id?: string;
    role: Role;
    companyId: string;
    baseUserId: string;
};
