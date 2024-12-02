import {Injectable} from '@nestjs/common';
import {CompanyUserRepository} from '../companyUserRepository';
import {SearchCompanyUsersResponseBuilder} from './searchCompanyUsersResponseBuilder';
import {SearchCompanyUsersDto} from '../dto/searchCompanyUsers.dto';
import {SearchCompanyUsersResponseData} from '../response-types/searchCompanyUsers.type';

@Injectable()
export class SearchCompanyUsersInteractor {
    constructor(
        private companyUserRepository: CompanyUserRepository,
        private responseBuilder: SearchCompanyUsersResponseBuilder,
    ) {}

    async execute(searchCompanyUsersDto: SearchCompanyUsersDto): Promise<SearchCompanyUsersResponseData[] | []> {
        const users = await this.companyUserRepository.findAll(searchCompanyUsersDto);
        return this.responseBuilder.build(users);
    }
}
