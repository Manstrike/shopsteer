import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanySchema} from 'src/db/company.schema';
import {CompanyRepository} from './companyRepository';

@Module({
    imports: [TypeOrmModule.forFeature([CompanySchema])],
    providers: [CompanyRepository],
    exports: [CompanyRepository],
})
export class CompanyGatewayModule {}
