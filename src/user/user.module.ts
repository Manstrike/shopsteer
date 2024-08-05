import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';

import {UserGatewayModule} from './user.gateway-module';

@Module({
    imports: [UserGatewayModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
