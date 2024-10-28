import {Injectable} from '@nestjs/common';

@Injectable()
export class SearchCompaniesResponseBuilder {
    async build(companies) {
        return companies.map((x) => ({
            id: x.id,
            name: x.name,
            isActive: x.isActive,
        }));
    }
}
