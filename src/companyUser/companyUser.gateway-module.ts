import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanyUserSchema} from 'src/db/companyUser.schema';
import {CompanyUserRepository} from './companyUserRepository';
import {GetCompanyUserInteractor} from './get-user/getCompanyUserInteractor';
import {GetCompanyUserResponseBuilder} from './get-user/getCompanyUserResponseBuilder';
import {CreateCompanyUserInteractor} from './create-user/createCompanyUserInteractor';
import {CreateCompanyUserResponseBuilder} from './create-user/createCompanyUserResponseBuilder';
import {SearchCompanyUsersInteractor} from './search-user/searchCompanyUsersInteractor';
import {SearchCompanyUsersResponseBuilder} from './search-user/searchCompanyUsersResponseBuilder';
import {UpdateCompanyUserInteractor} from './update-user/updateCompanyUserInteractor';
import {UpdateCompanyUserResponseBuilder} from './update-user/updateCompanyUserResponseBuilder';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyUserSchema])],
    controllers: [],
    providers: [
        CompanyUserRepository,
        GetCompanyUserInteractor,
        GetCompanyUserResponseBuilder,
        CreateCompanyUserInteractor,
        CreateCompanyUserResponseBuilder,
        SearchCompanyUsersInteractor,
        SearchCompanyUsersResponseBuilder,
        UpdateCompanyUserInteractor,
        UpdateCompanyUserResponseBuilder,
    ],
    exports: [
        CompanyUserRepository,
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
export class CompanyUserGatewayModule {}
