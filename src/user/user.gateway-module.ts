import {Module} from '@nestjs/common';
import {UserRepository} from './userRepository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from 'src/db/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class UserGatewayModule {}
