import {Module} from '@nestjs/common';
import {UserRepository} from './userRepository';

@Module({
    imports: [],
    controllers: [],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class UserGatewayModule {}
