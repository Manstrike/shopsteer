import {User} from './entities/user-entity/user';
import {CompanyUser} from './entities/company-user-entity/companyUser';
import {UserData} from './entities/user-entity/user.type';
import {CompanyUserData} from './entities/company-user-entity/companyUser.type';
import {CompanyData} from './entities/company-entity/company.type';
import {Company} from './entities/company-entity/company';

export function convertBaseUserSchemaToEntity(dbResult: UserData): User {
    return User.create(dbResult);
}

export function convertBaseUserEntityToDbData(baseUser: User): UserData {
    return {
        id: baseUser.getId(),
        login: baseUser.getLogin(),
        password: baseUser.getPassword(),
        phone: baseUser.getPhone(),
        email: baseUser.getEmail(),
        name: baseUser.getName(),
    };
}

export function convertBaseUserSchemaToResponse(dbResult: UserData) {
    return {
        id: dbResult.id,
        login: dbResult.login,
        password: dbResult.password,
        phone: dbResult.phone,
        email: dbResult.email,
        name: dbResult.name,
    };
}

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

export function convertCompanySchemaToEntity(dbResult: CompanyData): Company {
    return Company.create(dbResult);
}

export function convertCompanyEntityToDbData(company: Company): CompanyData {
    return {
        id: company.getId(),
        name: company.getName(),
        isActive: company.getIsActive(),
    };
}

export function convertCompanySchemaToResponse(dbResult: CompanyData) {
    return {
        id: dbResult.id,
        name: dbResult.name,
        isActive: dbResult.isActive,
    };
}
