import {Injectable, BadRequestException, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {QueryFailedError} from 'typeorm';
import {CreateCompanyUserDto} from './dto/createCompanyUser.dto';
import {SearchCompanyUsersDto} from './dto/searchCompanyUsers.dto';
import {UpdateCompanyUserDto} from './dto/updateCompanyUser.dto';
import {GetCompanyUserResponseData} from './response-types/getCompanyUser.type';
import {CreateCompanyUserInteractor} from './create-user/createCompanyUserInteractor';
import {UpdateCompanyUserInteractor} from './update-user/updateCompanyUserInteractor';
import {SearchCompanyUsersInteractor} from './search-user/searchCompanyUsersInteractor';
import {CreateCompanyUserResponseData} from './response-types/createCompanyUser.type';
import {GetCompanyUserInteractor} from './get-user/getCompanyUserInteractor';

@Injectable()
export class CompanyUserService {
    constructor(
        private getCompanyUserInteractor: GetCompanyUserInteractor,
        private createCompanyUserInteractor: CreateCompanyUserInteractor,
        private updateCompanyUserInteractor: UpdateCompanyUserInteractor,
        private searchCompanyUserInteractor: SearchCompanyUsersInteractor,
    ) {}

    async getUser(id: string): Promise<GetCompanyUserResponseData | null> {
        try {
            return this.getCompanyUserInteractor.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User with this id does not exist.');
            }
            throw new InternalServerErrorException();
        }
    }

    async create(createCompanyUserDto: CreateCompanyUserDto): Promise<CreateCompanyUserResponseData> {
        try {
            return this.createCompanyUserInteractor.execute(createCompanyUserDto);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
    }

    async search(searchCompanyUsersDto: SearchCompanyUsersDto) {
        try {
            return this.searchCompanyUserInteractor.execute(searchCompanyUsersDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, updateCompanyUserDto: UpdateCompanyUserDto) {
        try {
            return this.updateCompanyUserInteractor.execute(id, updateCompanyUserDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User was not found.');
            }
            throw new InternalServerErrorException();
        }
    }
}
