import {Injectable} from '@nestjs/common';

@Injectable()
export class GetCompanyResponseBuilder {
    async build(company) {
        return {
            name: company.name,
            isActive: company.isActive,
        };
    }
}
