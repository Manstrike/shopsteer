import {BadRequestException, Injectable} from '@nestjs/common';
import {CompanyRepository} from '../companyRepository';
import {CreateCompanyResponseBuilder} from './createCompanyResponseBuilder';
import {CreateCompanyResponseData} from '../response-types/createCompany.type';
import {Company} from 'src/entities/company-entity/company';
import {CreateCompanyDto} from '../dto/createCompany.dto';

@Injectable()
export class CreateCompanyInteractor {
    constructor(
        private companyRepository: CompanyRepository,
        private responseBuilder: CreateCompanyResponseBuilder,
    ) {}

    async execute(createCompanyDto: CreateCompanyDto): Promise<CreateCompanyResponseData> {
        const userCompanyExist = await this.companyRepository.findOne({name: createCompanyDto.name});
        if (userCompanyExist) {
            throw new BadRequestException('Company with this name already exists.');
        }

        const newCompany = Company.create({
            name: createCompanyDto.name,
            isActive: createCompanyDto.isActive,
        });

        await this.companyRepository.save(newCompany);
        return this.responseBuilder.build(newCompany);
    }
}
