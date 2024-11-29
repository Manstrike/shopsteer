import {Module} from '@nestjs/common';
import {CompanyGatewayModule} from './company.gateway-module';
import {CompanyService} from './company.service';
import {ConfigModule} from '@nestjs/config';
import {CompanyController} from './company.controller';
import {BaseUserGatewayModule} from 'src/baseUser/baseUser.gateway-module';
import {GetCompanyInteractor} from './get-company/getCompanyInteractor';
import {GetCompanyResponseBuilder} from './get-company/getCompanyResponseBuilder';
import {SearchCompaniesInteractor} from './search-company/searchCompaniesInteractor';
import {SearchCompaniesResponseBuilder} from './search-company/searchCompaniesResponseBuilder';
import {CreateCompanyInteractor} from './create-company/createCompanyInteractor';
import {CreateCompanyResponseBuilder} from './create-company/createCompanyResponseBuilder';
import {UpdateCompanyInteractor} from './update-company/updateCompanyInteractor';
import {UpdateCompanyResponseBuilder} from './update-company/updateCompanyResponseBuilder';

@Module({
    imports: [ConfigModule, CompanyGatewayModule, BaseUserGatewayModule],
    controllers: [CompanyController],
    providers: [
        CompanyService,
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
export class CompanyModule {}
