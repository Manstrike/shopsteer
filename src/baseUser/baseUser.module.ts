import {Module} from '@nestjs/common';
import {BaseUserController} from './baseUser.controller';
import {BaseUserService} from './baseUser.service';
import {ConfigModule} from '@nestjs/config';
import {BaseUserGatewayModule} from './baseUser.gateway-module';
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
import {AuthModule} from 'src/auth/auth.module';

@Module({
    imports: [ConfigModule, BaseUserGatewayModule, AuthModule],
    controllers: [BaseUserController],
    providers: [
        BaseUserService,
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
    ],
})
export class BaseUserModule {}
