import {Injectable, NotFoundException} from '@nestjs/common';
import {CompanyRepository} from '../companyRepository';
import {UpdateCompanyResponseBuilder} from './updateCompanyResponseBuilder';
import {Company} from 'src/entities/company-entity/company';
import {UpdateCompanyResponseData} from '../response-types/updateCompany.type';

@Injectable()
export class UpdateCompanyInteractor {
    constructor(
        private companyRepository: CompanyRepository,
        private responseBuilder: UpdateCompanyResponseBuilder,
    ) {}

    async execute(id, updateCompanyDto): Promise<UpdateCompanyResponseData> {
        const companyExists = await this.companyRepository.findById(id);
        if (!companyExists) {
            throw new NotFoundException('Company does not exist.');
        }

        let isActiveValue: boolean;

        if (updateCompanyDto.isActive !== undefined && typeof updateCompanyDto.isActive === 'boolean') {
            isActiveValue = updateCompanyDto.isActive;
        } else {
            isActiveValue = companyExists.isActive;
        }
        const updatedCompany = Company.create({
            id: companyExists.id,
            name: updateCompanyDto.name ? updateCompanyDto.name : companyExists.name,
            isActive: isActiveValue,
        });

        await this.companyRepository.save(updatedCompany);
        return this.responseBuilder.build(updatedCompany);
    }
}
