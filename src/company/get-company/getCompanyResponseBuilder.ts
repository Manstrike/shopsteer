import {Injectable} from '@nestjs/common';
import {CompanyData} from 'src/entities/company-entity/company.type';

@Injectable()
export class GetCompanyResponseBuilder {
    async build(company: CompanyData) {
        return {
            name: company.name,
            isActive: company.isActive,
        };
    }
}
