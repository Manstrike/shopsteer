import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {ConfigModule} from '@nestjs/config';
import {UserGatewayModule} from './user.gateway-module';

@Module({
    imports: [ConfigModule, UserGatewayModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
