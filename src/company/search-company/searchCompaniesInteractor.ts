import {Injectable} from '@nestjs/common';
import {CompanyRepository} from '../companyRepository';
import {SearchCompaniesResponseBuilder} from './searchCompaniesResponseBuilder';
import {SearchCompaniesResponseData} from '../response-types/searchCompanies.type';

@Injectable()
export class SearchCompaniesInteractor {
    constructor(
        private companyRepository: CompanyRepository,
        private responseBuilder: SearchCompaniesResponseBuilder,
    ) {}

    async execute(searchCompaniesDto): Promise<SearchCompaniesResponseData[] | []> {
        const companies = await this.companyRepository.findAll(searchCompaniesDto);
        return this.responseBuilder.build(companies);
    }
}
