import {Company} from 'src/entities/company-entity/company';
import {CompanyData} from 'src/entities/company-entity/company.type';

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
