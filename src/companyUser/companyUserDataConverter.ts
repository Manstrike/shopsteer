import {CompanyUser} from 'src/entities/company-user-entity/companyUser';
import {CompanyUserData} from 'src/entities/company-user-entity/companyUser.type';

export function convertCompanyUserSchemaToEntity(dbResult: CompanyUserData): CompanyUser {
    return CompanyUser.create(dbResult);
}

export function convertCompanyUserEntityToDbData(companyUser: CompanyUser): CompanyUserData {
    return {
        id: companyUser.getId(),
        role: companyUser.getRole(),
        baseUserId: companyUser.getBaseUserId(),
        companyId: companyUser.getCompanyId(),
    };
}

export function convertCompanyUserSchemaToResponse(dbResult: CompanyUserData) {
    return {
        id: dbResult.id,
        role: dbResult.role,
        baseUserId: dbResult.baseUserId,
        companyId: dbResult.companyId,
    };
}
