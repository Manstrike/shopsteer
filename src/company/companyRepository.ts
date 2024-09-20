import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {CompanySchema} from 'src/db/company.schema';
import {Company} from 'src/entities/company-entity/company';
import {SearchCompaniesDto} from './dto/searchCompanies.dto';
import {SearchOneCompanyDto} from './dto/searchOneCompany.dto';

@Injectable()
export class CompanyRepository {
    constructor(
        @InjectRepository(CompanySchema)
        private companyRepository: Repository<CompanySchema>,
    ) {}

    async findById(id: string) {
        const dbResult = await this.companyRepository.findOneBy({id});

        if (!dbResult) {
            return null;
        }
        const result = Company.create(dbResult);
        return result;
    }

    async findOne({id, merchantId, name, isActive}: SearchOneCompanyDto) {
        const dbResult = await this.companyRepository.findOneBy({id, merchantId, name, isActive});
        if (!dbResult) {
            return null;
        }
        const result = Company.create(dbResult);
        return result;
    }

    async findAll({ids, merchantId, name, isActive}: SearchCompaniesDto) {
        const whereConditions = {};
        if (ids) {
            whereConditions['id'] = In(ids);
        }

        if (merchantId) {
            whereConditions['merchantId'] = merchantId;
        }

        if (name) {
            whereConditions['name'] = name;
        }

        if (isActive) {
            whereConditions['isActive'] = isActive;
        }

        const dbResult = await this.companyRepository.find({
            where: whereConditions,
        });

        const result = dbResult.map((x) =>
            Company.create({
                id: x.id,
                merchantId: x.merchantId,
                name: x.name,
                merchant: x.merchant,
                isActive: x.isActive,
            }),
        );
        return result;
    }

    async save(company: Company) {
        await this.companyRepository.upsert(
            {
                id: company.getId(),
                merchantId: company.getMerchantId(),
                merchant: company.getMerchant(),
                name: company.getName(),
                isActive: company.getIsActive(),
            },
            ['id'],
        );
    }
}
