import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {BaseUserService} from './baseUser.service';
import {RegisterUserDto} from './dto/registerUser.dto';
import {LoginUserDto} from './dto/loginUser.dto';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {Public} from 'src/public.decorator';
import {TokenDataDecorator} from '../tokenData.decorator';
import {TokenData} from 'src/tokenData.type';

@Controller('users')
export class BaseUserController {
    constructor(private readonly baseUserService: BaseUserService) {}

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.baseUserService.getUser(id);
    }

    @Post('search')
    search(@Body() searchUserDto: SearchUsersDto) {
        return this.baseUserService.search(searchUserDto);
    }

    @Public()
    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.baseUserService.registerUser(registerUserDto);
    }

    @Public()
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.baseUserService.login(loginUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @TokenDataDecorator() tokenData: TokenData) {
        const requestUserId = tokenData.id;
        return this.baseUserService.update(id, updateUserDto, requestUserId);
    }
}
