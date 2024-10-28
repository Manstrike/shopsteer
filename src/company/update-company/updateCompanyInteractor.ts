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
            throw new NotFoundException();
        }

        const updatedCompany = Company.create({
            id: companyExists.id,
            name: updateCompanyDto.name ? updateCompanyDto.name : companyExists.name,
            // isActive is not optional anymore, since if it is missing in request it gets undefined.
            // if i use conditions as above for name then when isActive is changed to 'false' it wont change
            // because of condition looks like: if (false)... and it will always use companyExists.getIsActive()
            isActive:
                updateCompanyDto.isActive !== companyExists.isActive
                    ? updateCompanyDto.isActive
                    : companyExists.isActive,
        });

        await this.companyRepository.save(updatedCompany);
        return this.responseBuilder.build(updatedCompany);
    }
}
