import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {UserRepository} from './userRepository';
import {User} from 'src/entities/user-entity/user';
import {QueryFailedError} from 'typeorm';
import {PasswordHashService} from 'src/passwordHashService';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUser(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async search(searchUserDto: SearchUsersDto): Promise<User[] | []> {
        return this.userRepository.findAll(searchUserDto);
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<string> {
        try {
            const hashedPassword = await PasswordHashService.hash(registerUserDto.password);
            const userEntity = User.create({
                login: registerUserDto.login,
                password: hashedPassword,
                phone: registerUserDto.phone,
                role: registerUserDto.role,
            });
            await this.userRepository.save(userEntity);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
        return 'token';
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const user = await this.userRepository.findOne({login: loginUserDto.login});
        if (!user) {
            throw new BadRequestException();
        }

        const match = await PasswordHashService.compare(loginUserDto.password, user.getPassword());
        if (!match) {
            throw new BadRequestException();
        }
        return 'token';
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new BadRequestException();
        }

        let newHashedPassword;
        if (updateUserDto.password) {
            newHashedPassword = await PasswordHashService.hash(updateUserDto.password);
        }
        const updatedUser = User.create({
            id: user.getId(),
            login: updateUserDto.login ? updateUserDto.login : user.getLogin(),
            password: updateUserDto.password ? newHashedPassword : user.getPassword(),
            role: updateUserDto.role ? updateUserDto.role : user.getRole(),
            phone: updateUserDto.phone ? updateUserDto.phone : user.getPhone(),
        });
        await this.userRepository.save(updatedUser);
    }
}
