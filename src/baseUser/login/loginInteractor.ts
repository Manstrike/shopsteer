import {BadRequestException, Injectable} from '@nestjs/common';
import {BaseUserRepository} from '../baseUserRepository';
import {LoginUserDto} from '../dto/loginUser.dto';
import {LoginResponseBuilder} from './loginResponseBuilder';
import {PasswordHashService} from 'src/passwordHashService';
import {AuthService} from 'src/authService';

@Injectable()
export class LoginInteractor {
    constructor(
        private baseUserRepository: BaseUserRepository,
        private responseBuilder: LoginResponseBuilder,
        private authService: AuthService,
    ) {}

    async execute(loginUserDto: LoginUserDto): Promise<{access_token: string}> {
        const user = await this.baseUserRepository.findOne({login: loginUserDto.login});
        if (!user) {
            throw new BadRequestException();
        }

        const match = await PasswordHashService.compare(loginUserDto.password, (await user).password);
        if (!match) {
            throw new BadRequestException();
        }

        const token = await this.authService.sign({id: user.id});
        return this.responseBuilder.build(token);
    }
}
