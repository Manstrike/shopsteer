import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BaseUserSchema} from 'src/db/baseUser.schema';
import {BaseUserRepository} from './baseUserRepository';
import {GetBaseUserInteractor} from './get-user/getBaseUserInteractor';
import {SearchBaseUsersInteractor} from './search-user/searchBaseUsersInteractor';
import {RegisterBaseUserInteractor} from './register-user/registerBaseUserInteractor';
import {LoginInteractor} from './login/loginInteractor';
import {UpdateBaseUserInteractor} from './update-user/updateBaseUserInteractor';
import {RegisterBaseUserResponseBuilder} from './register-user/registerBaseUserResponseBuilder';
import {GetBaseUserResponseBuilder} from './get-user/getBaseUserResponseBuilder';
import {SearchBaseUsersResponseBuilder} from './search-user/searchBaseUsersResponseBuilder';
import {LoginResponseBuilder} from './login/loginResponseBuilder';
import {UpdateBaseUserResponseBuilder} from './update-user/updateBaseUserResponseBuilder';
import {AuthService} from 'src/authService';
import {JwtService} from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([BaseUserSchema])],
    controllers: [],
    providers: [
        JwtService,
        BaseUserRepository,
        RegisterBaseUserInteractor,
        RegisterBaseUserResponseBuilder,
        GetBaseUserInteractor,
        GetBaseUserResponseBuilder,
        SearchBaseUsersInteractor,
        SearchBaseUsersResponseBuilder,
        LoginInteractor,
        LoginResponseBuilder,
        UpdateBaseUserInteractor,
        UpdateBaseUserResponseBuilder,
        AuthService,
    ],
    exports: [
        BaseUserRepository,
        RegisterBaseUserInteractor,
        RegisterBaseUserResponseBuilder,
        GetBaseUserInteractor,
        GetBaseUserResponseBuilder,
        SearchBaseUsersInteractor,
        SearchBaseUsersResponseBuilder,
        LoginInteractor,
        LoginResponseBuilder,
        UpdateBaseUserInteractor,
        UpdateBaseUserResponseBuilder,
        JwtService,
    ],
})
export class BaseUserGatewayModule {}
