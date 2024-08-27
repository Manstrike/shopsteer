import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {User} from 'src/entities/user';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    getUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.getUser(id);
    }

    @Post('search')
    search(@Body() searchUserDto: SearchUsersDto): Promise<User[] | []> {
        return this.userService.search(searchUserDto);
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto): Promise<string> {
        return this.userService.registerUser(registerUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto): Promise<string> {
        return this.userService.login(loginUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
}
