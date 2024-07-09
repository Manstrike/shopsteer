import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserRepository} from './userRepository';
import {UserFactory} from 'src/entities/userFactory';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserFactory],
    exports: [UserService, UserRepository],
})
export class UserModule {}
