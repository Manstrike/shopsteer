import {Module} from '@nestjs/common';
import {CompanyUserController} from './companyUser.controller';
import {CompanyUserService} from './companyUser.service';
import {ConfigModule} from '@nestjs/config';
import {CompanyUserGatewayModule} from './companyUser.gateway-module';

@Module({
    imports: [ConfigModule, CompanyUserGatewayModule],
    controllers: [CompanyUserController],
    providers: [CompanyUserService],
})
export class CompanyUserModule {}
