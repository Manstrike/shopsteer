import {Module} from '@nestjs/common';
import {UserRepository} from './userRepository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserSchema} from 'src/db/user.schema';

@Module({
    imports: [TypeOrmModule.forFeature([UserSchema])],
    controllers: [],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class UserGatewayModule {}
