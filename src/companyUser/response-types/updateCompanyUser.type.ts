import {Role} from '../userRoles';

export type UpdateCompanyUserResponseData = {
    id: string;
    role: Role;
    companyId: string;
    baseUserId: string;
};
