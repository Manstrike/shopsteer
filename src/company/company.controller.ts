import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {CompanyService} from './company.service';
import {CreateCompanyDto} from './dto/createCompany.dto';
import {SearchCompaniesDto} from './dto/searchCompanies.dto';
import {UpdateCompanyDto} from './dto/updateCompany.dto';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.companyService.getCompany(id);
    }

    @Post('create')
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @Post('search')
    search(@Body() searchCompaniesDto: SearchCompaniesDto) {
        return this.companyService.search(searchCompaniesDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.companyService.update(id, updateCompanyDto);
    }
}
