import {Role} from '../userRoles';

export type SearchCompanyUsersResponseData = {
    id: string;
    role: Role;
    baseUserId: string;
    companyId: string;
};
