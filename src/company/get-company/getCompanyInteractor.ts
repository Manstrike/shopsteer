import {Injectable, NotFoundException} from '@nestjs/common';
import {CompanyRepository} from '../companyRepository';
import {GetCompanyResponseBuilder} from './getCompanyResponseBuilder';
import {GetCompanyResponseData} from '../response-types/getCompany.type';

@Injectable()
export class GetCompanyInteractor {
    constructor(
        private companyRepository: CompanyRepository,
        private responseBuilder: GetCompanyResponseBuilder,
    ) {}

    async execute(id: string): Promise<GetCompanyResponseData | null> {
        const company = await this.companyRepository.findById(id);

        if (!company) {
            throw new NotFoundException('Company was not found.');
        }

        return this.responseBuilder.build(company);
    }
}
