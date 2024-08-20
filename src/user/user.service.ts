import {Injectable} from '@nestjs/common';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {UserRepository} from './userRepository';
import {UserData} from 'src/entities/user.type';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUser(id: string): Promise<UserData | null> {
        return this.userRepository.findById(id);
    }

    async search(searchUserDto: SearchUsersDto): Promise<UserData[] | []> {
        return this.userRepository.findAll(searchUserDto);
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<string> {
        const user = await this.userRepository.findOne({login: registerUserDto.login});
        if (user) {
            //error
            return 'user already exists.';
        }

        this.userRepository.save(registerUserDto);
        return 'token';
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const user = await this.userRepository.findOne({login: loginUserDto.login});
        if (!user) {
            //error
            return 'user with this login was snot found.';
        }

        if (user.password !== loginUserDto.password) {
            //error
            return 'wrong password.';
        }
        return 'token';
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        await this.userRepository.save({
            id,
            login: updateUserDto.login,
            phone: updateUserDto.phone,
            role: updateUserDto.role,
            password: updateUserDto.password,
        });
    }
}
