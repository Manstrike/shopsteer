import {BaseUserRepository} from '../baseUserRepository';
import {UpdateUserDto} from '../dto/updateUser.dto';
import {UpdateBaseUserResponseBuilder} from './updateBaseUserResponseBuilder';
import {PasswordHashService} from 'src/passwordHashService';
import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {User} from 'src/entities/user-entity/user';
import {UpdateBaseUsersResponseData} from '../response-types/updateBaseUser.type';

@Injectable()
export class UpdateBaseUserInteractor {
    constructor(
        private baseUserRepository: BaseUserRepository,
        private responseBuilder: UpdateBaseUserResponseBuilder,
    ) {}

    async execute(
        id: string,
        updateUserDto: UpdateUserDto,
        requestUserId: string,
    ): Promise<UpdateBaseUsersResponseData> {
        const user = await this.baseUserRepository.findById(id);
        if (!user) {
            throw new BadRequestException('User does not exist.');
        }

        if (user.id !== requestUserId) {
            throw new ForbiddenException();
        }

        let newHashedPassword;
        if (updateUserDto.password) {
            newHashedPassword = await PasswordHashService.hash(updateUserDto.password);
        }
        const updatedUser = User.create({
            id: user.id,
            login: updateUserDto.login ? updateUserDto.login : user.login,
            password: updateUserDto.password ? newHashedPassword : user.password,
            phone: updateUserDto.phone ? updateUserDto.phone : user.phone,
            name: updateUserDto.name ? updateUserDto.name : user.name,
            email: updateUserDto.email ? updateUserDto.email : user.email,
        });
        await this.baseUserRepository.save(updatedUser);

        return this.responseBuilder.build(updatedUser);
    }
}
