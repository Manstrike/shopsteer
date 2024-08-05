import {Injectable} from '@nestjs/common';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {UserRepository} from './userRepository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getUser(id: string): Promise<string> {
        return this.userRepository.findById(id);
    }

    async search(searchUserDto: SearchUsersDto): Promise<string[]> {
        return this.userRepository.findAll(searchUserDto);
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<string[]> {
        return this.userRepository.findAll({login: registerUserDto.login});
        // return { token: 'token' };
    }

    async login(loginUserDto: LoginUserDto): Promise<string[]> {
        return this.userRepository.findAll({login: loginUserDto.login});
        // return { token: 'token' }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<string[]> {
        return [id, updateUserDto.phone];
    }
}
