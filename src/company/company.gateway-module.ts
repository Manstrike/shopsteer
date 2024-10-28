import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanySchema} from 'src/db/company.schema';
import {CompanyRepository} from './companyRepository';
import {GetCompanyInteractor} from './get-company/getCompanyInteractor';
import {GetCompanyResponseBuilder} from './get-company/getCompanyResponseBuilder';
import {SearchCompaniesInteractor} from './search-company/searchCompaniesInteractor';
import {SearchCompaniesResponseBuilder} from './search-company/searchCompaniesResponseBuilder';
import {CreateCompanyInteractor} from './create-company/createCompanyInteractor';
import {CreateCompanyResponseBuilder} from './create-company/createCompanyResponseBuilder';
import {UpdateCompanyInteractor} from './update-company/updateCompanyInteractor';
import {UpdateCompanyResponseBuilder} from './update-company/updateCompanyResponseBuilder';

@Module({
    imports: [TypeOrmModule.forFeature([CompanySchema])],
    controllers: [],
    providers: [
        CompanyRepository,
        GetCompanyInteractor,
        GetCompanyResponseBuilder,
        SearchCompaniesInteractor,
        SearchCompaniesResponseBuilder,
        CreateCompanyInteractor,
        CreateCompanyResponseBuilder,
        UpdateCompanyInteractor,
        UpdateCompanyResponseBuilder,
    ],
    exports: [
        CompanyRepository,
        GetCompanyInteractor,
        GetCompanyResponseBuilder,
        SearchCompaniesInteractor,
        SearchCompaniesResponseBuilder,
        CreateCompanyInteractor,
        CreateCompanyResponseBuilder,
        UpdateCompanyInteractor,
        UpdateCompanyResponseBuilder,
    ],
})
export class CompanyGatewayModule {}
