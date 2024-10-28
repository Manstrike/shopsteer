import {BadRequestException, Injectable} from '@nestjs/common';
import {CompanyUserRepository} from '../companyUserRepository';
import {UpdateCompanyUserResponseBuilder} from './updateCompanyUserResponseBuilder';
import {UpdateCompanyUserDto} from '../dto/updateCompanyUser.dto';
import {UpdateCompanyUserResponseData} from '../response-types/updateCompanyUser.type';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

@Injectable()
export class UpdateCompanyUserInteractor {
    constructor(
        private companyUserRepository: CompanyUserRepository,
        private responseBuilder: UpdateCompanyUserResponseBuilder,
    ) {}

    async execute(id: string, updateCompanyUserDto: UpdateCompanyUserDto): Promise<UpdateCompanyUserResponseData> {
        const user = await this.companyUserRepository.findById(id);
        if (!user) {
            throw new BadRequestException();
        }

        const updatedUser = CompanyUser.create({
            id: user.id,
            role: updateCompanyUserDto.role ? updateCompanyUserDto.role : user.role,
            baseUserId: user.baseUserId,
            companyId: user.companyId,
        });
        await this.companyUserRepository.save(updatedUser);

        return this.responseBuilder.build(updatedUser);
    }
}
