import {BaseUserRepository} from '../baseUserRepository';
import {RegisterUserDto} from '../dto/registerUser.dto';
import {RegisterBaseUserResponseBuilder} from './registerBaseUserResponseBuilder';
import {PasswordHashService} from 'src/passwordHashService';
import {User} from 'src/entities/user-entity/user';
import {BadRequestException, Injectable} from '@nestjs/common';
import {AuthService} from 'src/authService';

@Injectable()
export class RegisterBaseUserInteractor {
    constructor(
        private baseUserRepository: BaseUserRepository,
        private responseBuilder: RegisterBaseUserResponseBuilder,
        private authservice: AuthService,
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<{access_token: string}> {
        const user = await this.baseUserRepository.findOne({login: registerUserDto.login});

        if (user) {
            throw new BadRequestException();
        }

        const hashedPassword = await PasswordHashService.hash(registerUserDto.password);
        const userEntity = User.create({
            login: registerUserDto.login,
            password: hashedPassword,
            phone: registerUserDto.phone,
            email: registerUserDto.email,
            name: registerUserDto.name,
        });
        await this.baseUserRepository.save(userEntity);

        const registeredUser = await this.baseUserRepository.findOne({login: registerUserDto.login});
        const token = await this.authservice.sign({id: registeredUser.id});
        return this.responseBuilder.build(token);
    }
}
