import {Injectable, BadRequestException, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {QueryFailedError} from 'typeorm';
import {GetBaseUserInteractor} from './get-user/getBaseUserInteractor';
import {GetBaseUserResponseData} from './response-types/getBaseUser.type';
import {SearchBaseUsersResponseData} from './response-types/searchBaseUsers.type';
import {SearchBaseUsersInteractor} from './search-user/searchBaseUsersInteractor';
import {RegisterBaseUserInteractor} from './register-user/registerBaseUserInteractor';
import {LoginInteractor} from './login/loginInteractor';
import {UpdateBaseUserInteractor} from './update-user/updateBaseUserInteractor';
import {UpdateBaseUsersResponseData} from './response-types/updateBaseUser.type';

@Injectable()
export class BaseUserService {
    constructor(
        private getBaseUserInteractor: GetBaseUserInteractor,
        private searchBaseUsersInteractor: SearchBaseUsersInteractor,
        private registerBaseUserInteractor: RegisterBaseUserInteractor,
        private loginInteractor: LoginInteractor,
        private updateInteractor: UpdateBaseUserInteractor,
    ) {}

    async getUser(id: string): Promise<GetBaseUserResponseData | null> {
        try {
            return this.getBaseUserInteractor.execute(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User with this id does not exist.');
            }
            throw new InternalServerErrorException();
        }
    }

    async search(searchUserDto: SearchUsersDto): Promise<SearchBaseUsersResponseData[] | []> {
        try {
            return this.searchBaseUsersInteractor.execute(searchUserDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<{access_token: string}> {
        try {
            return this.registerBaseUserInteractor.execute(registerUserDto);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException();
            }
            if (error instanceof BadRequestException) {
                throw new BadRequestException('User already exists.');
            }
            throw new InternalServerErrorException();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<{access_token: string}> {
        try {
            return this.loginInteractor.execute(loginUserDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User does not exist.');
            }
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateBaseUsersResponseData> {
        try {
            return this.updateInteractor.execute(id, updateUserDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException('User does not exist.');
            }
            throw new InternalServerErrorException();
        }
    }
}
