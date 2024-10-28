import {Module} from '@nestjs/common';
import {BaseUserController} from './baseUser.controller';
import {BaseUserService} from './baseUser.service';
import {ConfigModule} from '@nestjs/config';
import {BaseUserGatewayModule} from './baseUser.gateway-module';

@Module({
    imports: [ConfigModule, BaseUserGatewayModule],
    controllers: [BaseUserController],
    providers: [BaseUserService],
})
export class BaseUserModule {}
