import {Injectable, NotFoundException} from '@nestjs/common';
import {GetCompanyUserResponseBuilder} from './getCompanyUserResponseBuilder';
import {GetCompanyUserResponseData} from '../response-types/getCompanyUser.type';
import {CompanyUserRepository} from '../companyUserRepository';

@Injectable()
export class GetCompanyUserInteractor {
    constructor(
        private companyUserRepository: CompanyUserRepository,
        private getCompanyUserResponseBuilder: GetCompanyUserResponseBuilder,
    ) {}

    async execute(id: string): Promise<GetCompanyUserResponseData | null> {
        const user = await this.companyUserRepository.findById(id);

        if (!user) {
            throw new NotFoundException('User was not found.');
        }

        return this.getCompanyUserResponseBuilder.build(user);
    }
}
