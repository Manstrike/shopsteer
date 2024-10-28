import {BaseUserRepository} from '../baseUserRepository';
import {SearchBaseUsersResponseBuilder} from './searchBaseUsersResponseBuilder';
import {SearchUsersDto} from '../dto/searchUsers.dto';
import {SearchBaseUsersResponseData} from '../response-types/searchBaseUsers.type';
import {Injectable} from '@nestjs/common';

@Injectable()
export class SearchBaseUsersInteractor {
    constructor(
        private baseUserRepository: BaseUserRepository,
        private searchBaseUsersResponseBuilder: SearchBaseUsersResponseBuilder,
    ) {}

    async execute(searchUsersDto: SearchUsersDto): Promise<SearchBaseUsersResponseData[] | []> {
        const users = await this.baseUserRepository.findAll(searchUsersDto);
        return this.searchBaseUsersResponseBuilder.build(users);
    }
}
