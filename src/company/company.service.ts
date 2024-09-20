import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {Company} from 'src/entities/company-entity/company';
import {QueryFailedError} from 'typeorm';
import {CompanyRepository} from './companyRepository';
import {SearchCompaniesDto} from './dto/searchCompanies.dto';
import {CreateCompanyDto} from './dto/createCompany.dto';
import {UpdateCompanyDto} from './dto/updateCompany.dto';
import {UserRepository} from 'src/user/userRepository';
import {Roles} from 'src/user/userRoles';

@Injectable()
export class CompanyService {
    constructor(
        private companyRepository: CompanyRepository,
        private userRepository: UserRepository,
    ) {}

    async getCompany(id: string): Promise<Company | null> {
        return this.companyRepository.findById(id);
    }

    async search(searchCompaniesDto: SearchCompaniesDto): Promise<Company[] | []> {
        return this.companyRepository.findAll(searchCompaniesDto);
    }

    async create(createCompanyDto: CreateCompanyDto) {
        const user = await this.userRepository.findById(createCompanyDto.merchantId);
        if (user.getRole() !== Roles.MERCHANT) {
            throw new BadRequestException('User is not merchant.');
        }

        const userCompanyExist = await this.companyRepository.findOne({merchantId: createCompanyDto.merchantId});
        if (userCompanyExist) {
            throw new BadRequestException('User is already registered as company.');
        }

        try {
            const companyEntity = Company.create({
                merchantId: createCompanyDto.merchantId,
                merchant: createCompanyDto.merchant,
                name: createCompanyDto.name,
                isActive: createCompanyDto.isActive,
            });
            await this.companyRepository.save(companyEntity);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto) {
        const company = await this.companyRepository.findById(id);
        if (!company) {
            throw new BadRequestException();
        }
        const updatedCompany = Company.create({
            id: company.getId(),
            merchantId: company.getMerchantId(),
            merchant: company.getMerchant(),
            name: updateCompanyDto.name ? updateCompanyDto.name : company.getName(),
            isActive:
                updateCompanyDto.isActive !== company.getIsActive() ? updateCompanyDto.isActive : company.getIsActive(),
        });
        await this.companyRepository.save(updatedCompany);
    }
}
