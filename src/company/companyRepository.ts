import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {CompanySchema} from 'src/db/company.schema';
import {Company} from 'src/entities/company-entity/company';
import {SearchCompaniesDto} from './dto/searchCompanies.dto';
import {SearchOneCompanyDto} from './dto/searchOneCompany.dto';
import {convertCompanyEntityToDbData, convertCompanySchemaToResponse} from 'src/dataConverters';
import {CompanyData} from 'src/entities/company-entity/company.type';

@Injectable()
export class CompanyRepository {
    constructor(
        @InjectRepository(CompanySchema)
        private companyRepository: Repository<CompanySchema>,
    ) {}

    async findById(id: string): Promise<CompanyData | null> {
        const dbResult = await this.companyRepository.findOneBy({id});

        if (!dbResult) {
            return null;
        }
        const result = convertCompanySchemaToResponse(dbResult);
        return result;
    }

    async findOne({id, name, isActive}: SearchOneCompanyDto): Promise<CompanyData | null> {
        const dbResult = await this.companyRepository.findOneBy({id, name, isActive});
        if (!dbResult) {
            return null;
        }
        const result = convertCompanySchemaToResponse(dbResult);
        return result;
    }

    async findAll({ids, merchantId, name, isActive}: SearchCompaniesDto): Promise<CompanyData[] | []> {
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

        /* const result = dbResult.map((x) =>
            Company.create({
                id: x.id,
                name: x.name,
                isActive: x.isActive,
            }),
        ); */
        const result = dbResult.map((x) =>
            convertCompanySchemaToResponse({
                id: x.id,
                name: x.name,
                isActive: x.isActive,
            }),
        );
        return result;
    }

    async save(company: Company) {
        const dataToSave = convertCompanyEntityToDbData(company);
        await this.companyRepository.upsert(
            {
                id: dataToSave.id,
                name: dataToSave.name,
                isActive: dataToSave.isActive,
            },
            ['id'],
        );
    }
}
