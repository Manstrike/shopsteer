import {Role} from 'src/companyUser/userRoles';

export type CompanyUserData = {
    id?: string;
    role: Role;
    baseUserId: string;
    companyId: string;
    createdAt?: Date;
    updatedAt?: Date;
};
