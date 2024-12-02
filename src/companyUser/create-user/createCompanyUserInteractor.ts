import {Injectable} from '@nestjs/common';
import {CompanyUserRepository} from '../companyUserRepository';
import {CreateCompanyUserDto} from '../dto/createCompanyUser.dto';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';
import {CreateCompanyUserResponseBuilder} from './createCompanyUserResponseBuilder';
import {CreateCompanyUserResponseData} from '../response-types/createCompanyUser.type';

@Injectable()
export class CreateCompanyUserInteractor {
    constructor(
        private companyUserRepository: CompanyUserRepository,
        private responseBuilder: CreateCompanyUserResponseBuilder,
    ) {}

    async execute(createCompanyUserDto: CreateCompanyUserDto): Promise<CreateCompanyUserResponseData> {
        const companyUser = CompanyUser.create(createCompanyUserDto);
        await this.companyUserRepository.save(companyUser);
        return this.responseBuilder.build(companyUser);
    }
}
