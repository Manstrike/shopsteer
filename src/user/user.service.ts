import {Injectable} from '@nestjs/common';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {UserRepository} from './userRepository';
import {User} from 'src/entities/user';

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
        const user = await this.userRepository.findOne({login: registerUserDto.login});
        if (user) {
            //error
            return 'user already exists.';
        }
        //probably phone validation is needed so there is unique phone number for each user

        const userEntity = User.create(registerUserDto);
        this.userRepository.save(userEntity);
        return 'token';
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const user = await this.userRepository.findOne({login: loginUserDto.login});
        if (!user) {
            //error
            return 'user with this login was snot found.';
        }

        if (!user.verifyPassword(loginUserDto.password)) {
            //error
            return 'wrong password.';
        }
        return 'token';
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            //error
            return 'user not found';
        }
        user.updateUser({
            newLogin: updateUserDto.login,
            newPassword: updateUserDto.password,
            newRole: updateUserDto.role,
            newPhone: updateUserDto.phone,
        });
        await this.userRepository.save(user);
    }
}
