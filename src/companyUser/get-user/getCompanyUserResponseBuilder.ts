import {CompanyUserData} from 'src/entities/company-user-entity/companyUser.type';

export class GetCompanyUserResponseBuilder {
    async build(user: CompanyUserData) {
        return {
            role: user.role,
            baseUserId: user.baseUserId,
            companyId: user.companyId,
        };
    }
}
