import {Injectable} from '@nestjs/common';
import {SearchCompanyUsersDto} from './dto/searchCompanyUsers.dto';
import {SearchOneCompanyUserDto} from './dto/searchOneCompanyUser.dt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';
import {CompanyUserSchema} from 'src/db/companyUser.schema';
import {convertCompanyUserEntityToDbData, convertCompanyUserSchemaToResponse} from 'src/dataConverters';
import {CompanyUserData} from 'src/entities/company-user-entity/companyUser.type';

@Injectable()
export class CompanyUserRepository {
    constructor(
        @InjectRepository(CompanyUserSchema)
        private companyUserRepository: Repository<CompanyUserSchema>,
    ) {}

    async findById(id: string): Promise<CompanyUserData | null> {
        const dbResult = await this.companyUserRepository.findOneBy({id});
        if (!dbResult) {
            return null;
        }
        const result = convertCompanyUserSchemaToResponse(dbResult);
        return result;
    }

    async findOne({id, role, companyId, baseUserId}: SearchOneCompanyUserDto): Promise<CompanyUserData | null> {
        const dbResult = await this.companyUserRepository.findOneBy({id, role, companyId, baseUserId});
        if (!dbResult) {
            return null;
        }
        const result = convertCompanyUserSchemaToResponse(dbResult);
        return result;
    }

    async findAll({ids, role, companyId, baseUserId}: SearchCompanyUsersDto): Promise<CompanyUserData[] | []> {
        const whereConditions = {};
        if (ids) {
            whereConditions['id'] = In(ids);
        }

        if (role) {
            whereConditions['role'] = role;
        }

        if (companyId) {
            whereConditions['companyId'] = companyId;
        }

        if (baseUserId) {
            whereConditions['baseUserId'] = baseUserId;
        }

        const dbResult = await this.companyUserRepository.find({
            where: whereConditions,
        });
        //TODO: remove comment
        /* const result = dbResult.map((x) =>
            CompanyUser.create({
                id: x.id,
                role: x.role,
                companyId: x.companyId,
                baseUserId: x.baseUserId,
            }),
        ); */
        const result = dbResult.map((x) =>
            convertCompanyUserSchemaToResponse({
                id: x.id,
                role: x.role,
                companyId: x.companyId,
                baseUserId: x.baseUserId,
            }),
        );
        return result;
    }

    async save(companyUser: CompanyUser) {
        const dataToSave = convertCompanyUserEntityToDbData(companyUser);
        await this.companyUserRepository.upsert(
            {
                id: dataToSave.id,
                role: dataToSave.role,
                companyId: dataToSave.companyId,
                baseUserId: dataToSave.baseUserId,
            },
            ['id'],
        );
    }
}
