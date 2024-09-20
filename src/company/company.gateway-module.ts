import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CompanySchema} from 'src/db/company.schema';
import {CompanyRepository} from './companyRepository';
import {UserRepository} from 'src/user/userRepository';
import {UserSchema} from 'src/db/user.schema';

@Module({
    imports: [TypeOrmModule.forFeature([CompanySchema, UserSchema])],
    controllers: [],
    providers: [CompanyRepository, UserRepository],
    exports: [CompanyRepository, UserRepository],
})
export class CompanyGatewayModule {}
