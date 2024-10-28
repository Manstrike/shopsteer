import {Module} from '@nestjs/common';
import {CompanyGatewayModule} from './company.gateway-module';
import {CompanyService} from './company.service';
import {ConfigModule} from '@nestjs/config';
import {CompanyController} from './company.controller';
import {BaseUserGatewayModule} from 'src/baseUser/baseUser.gateway-module';

@Module({
    imports: [ConfigModule, CompanyGatewayModule, BaseUserGatewayModule],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
