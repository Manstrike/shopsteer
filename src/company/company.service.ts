import {Injectable, BadRequestException, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {QueryFailedError} from 'typeorm';
import {CompanyRepository} from './companyRepository';
import {SearchCompaniesDto} from './dto/searchCompanies.dto';
import {CreateCompanyDto} from './dto/createCompany.dto';
import {UpdateCompanyDto} from './dto/updateCompany.dto';
import {GetCompanyInteractor} from './get-company/getCompanyInteractor';
import {GetCompanyResponseData} from './response-types/getCompany.type';
import {SearchCompaniesResponseData} from './response-types/searchCompanies.type';
import {SearchCompaniesInteractor} from './search-company/searchCompaniesInteractor';
import {CreateCompanyInteractor} from './create-company/createCompanyInteractor';
import {CreateCompanyResponseData} from './response-types/createCompany.type';
import {UpdateCompanyInteractor} from './update-company/updateCompanyInteractor';

@Injectable()
export class CompanyService {
    constructor(
        private companyRepository: CompanyRepository,
        private getCompanyInteractor: GetCompanyInteractor,
        private searchCompaniesInteractor: SearchCompaniesInteractor,
        private createCompanyInteractor: CreateCompanyInteractor,
        private updateCompanyInteractor: UpdateCompanyInteractor,
    ) {}

    async getCompany(id: string): Promise<GetCompanyResponseData | null> {
        try {
            return this.getCompanyInteractor.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Company was not found.');
            }
            throw new InternalServerErrorException();
        }
    }

    async search(searchCompaniesDto: SearchCompaniesDto): Promise<SearchCompaniesResponseData[] | []> {
        try {
            return this.searchCompaniesInteractor.execute(searchCompaniesDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async create(createCompanyDto: CreateCompanyDto): Promise<CreateCompanyResponseData> {
        try {
            return this.createCompanyInteractor.execute(createCompanyDto);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto) {
        try {
            return this.updateCompanyInteractor.execute(id, updateCompanyDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('Company was not found.');
            }
            throw new InternalServerErrorException();
        }
    }
}
