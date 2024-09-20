import {Module} from '@nestjs/common';
import {CompanyGatewayModule} from './company.gateway-module';
import {CompanyService} from './company.service';
import {ConfigModule} from '@nestjs/config';
import {CompanyController} from './company.controller';

@Module({
    imports: [ConfigModule, CompanyGatewayModule],
    controllers: [CompanyController],
    providers: [CompanyService],
})
export class CompanyModule {}
