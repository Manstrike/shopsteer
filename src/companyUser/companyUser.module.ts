import {Module} from '@nestjs/common';
import {CompanyUserController} from './companyUser.controller';
import {CompanyUserService} from './companyUser.service';
import {ConfigModule} from '@nestjs/config';
import {CompanyUserGatewayModule} from './companyUser.gateway-module';
import {GetCompanyUserInteractor} from './get-user/getCompanyUserInteractor';
import {GetCompanyUserResponseBuilder} from './get-user/getCompanyUserResponseBuilder';
import {CreateCompanyUserInteractor} from './create-user/createCompanyUserInteractor';
import {CreateCompanyUserResponseBuilder} from './create-user/createCompanyUserResponseBuilder';
import {SearchCompanyUsersInteractor} from './search-user/searchCompanyUsersInteractor';
import {SearchCompanyUsersResponseBuilder} from './search-user/searchCompanyUsersResponseBuilder';
import {UpdateCompanyUserInteractor} from './update-user/updateCompanyUserInteractor';
import {UpdateCompanyUserResponseBuilder} from './update-user/updateCompanyUserResponseBuilder';

@Module({
    imports: [ConfigModule, CompanyUserGatewayModule],
    controllers: [CompanyUserController],
    providers: [
        CompanyUserService,
        GetCompanyUserInteractor,
        GetCompanyUserResponseBuilder,
        CreateCompanyUserInteractor,
        CreateCompanyUserResponseBuilder,
        SearchCompanyUsersInteractor,
        SearchCompanyUsersResponseBuilder,
        UpdateCompanyUserInteractor,
        UpdateCompanyUserResponseBuilder,
    ],
})
export class CompanyUserModule {}
