import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {CompanyUserService} from './companyUser.service';
import {UpdateCompanyUserDto} from './dto/updateCompanyUser.dto';
import {SearchCompanyUsersDto} from './dto/searchCompanyUsers.dto';
import {CreateCompanyUserDto} from './dto/createCompanyUser.dto';

@Controller('company-users')
export class CompanyUserController {
    constructor(private readonly companyUserService: CompanyUserService) {}

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.companyUserService.getUser(id);
    }

    @Post('search')
    search(@Body() searchUserDto: SearchCompanyUsersDto) {
        return this.companyUserService.search(searchUserDto);
    }

    @Post('create')
    create(@Body() createCompanyUserDto: CreateCompanyUserDto) {
        return this.companyUserService.create(createCompanyUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateCompanyUserDto) {
        return this.companyUserService.update(id, updateUserDto);
    }
}
