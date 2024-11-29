import {Injectable} from '@nestjs/common';
import {CompanyUserData} from 'src/entities/company-user-entity/companyUser.type';

@Injectable()
export class SearchCompanyUsersResponseBuilder {
    async build(users: CompanyUserData[]) {
        return users.map((x) => ({
            id: x.id,
            role: x.role,
            companyId: x.companyId,
            baseUserId: x.baseUserId,
        }));
    }
}
