import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanyUserSchema} from 'src/db/companyUser.schema';
import {CompanyUserRepository} from './companyUserRepository';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyUserSchema])],
    providers: [CompanyUserRepository],
    exports: [CompanyUserRepository],
})
export class CompanyUserGatewayModule {}
