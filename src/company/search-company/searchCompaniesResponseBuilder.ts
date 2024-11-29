import {Injectable} from '@nestjs/common';
import {CompanyData} from 'src/entities/company-entity/company.type';

@Injectable()
export class SearchCompaniesResponseBuilder {
    async build(companies: CompanyData[]) {
        return companies.map((x) => ({
            id: x.id,
            name: x.name,
            isActive: x.isActive,
        }));
    }
}
