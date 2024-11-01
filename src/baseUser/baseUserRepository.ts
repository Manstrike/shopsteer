import {Injectable} from '@nestjs/common';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {SearchOneUserDto} from './dto/searchOneUser.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {BaseUserSchema} from 'src/db/baseUser.schema';
import {User} from 'src/entities/user-entity/user';
import {convertBaseUserEntityToDbData, convertBaseUserSchemaToResponse} from 'src/dataConverters';
import {UserData} from 'src/entities/user-entity/user.type';

@Injectable()
export class BaseUserRepository {
    constructor(
        @InjectRepository(BaseUserSchema)
        private userRepository: Repository<BaseUserSchema>,
    ) {}

    async findById(id: string): Promise<UserData | null> {
        const dbResult = await this.userRepository.findOneBy({id});
        if (!dbResult) {
            return null;
        }
        const result = convertBaseUserSchemaToResponse(dbResult);
        return result;
    }

    async findOne({id, login, phone}: SearchOneUserDto): Promise<UserData | null> {
        const dbResult = await this.userRepository.findOneBy({id, login, phone});
        if (!dbResult) {
            return null;
        }
        const result = convertBaseUserSchemaToResponse(dbResult);
        return result;
    }

    async findAll({ids, login, phone}: SearchUsersDto): Promise<UserData[] | []> {
        const whereConditions = {};
        if (ids) {
            whereConditions['id'] = In(ids);
        }

        if (login) {
            whereConditions['login'] = login;
        }

        if (phone) {
            whereConditions['phone'] = phone;
        }

        const dbResult = await this.userRepository.find({
            where: whereConditions,
        });

        const result = dbResult.map((x) =>
            convertBaseUserSchemaToResponse({
                id: x.id,
                login: x.login,
                password: x.password,
                phone: x.phone,
                email: x.email,
                name: x.name,
            }),
        );
        return result;
    }

    async save(user: User) {
        const dataToSave = convertBaseUserEntityToDbData(user);
        await this.userRepository.upsert(
            {
                id: dataToSave.id,
                login: dataToSave.login,
                phone: dataToSave.phone,
                password: dataToSave.password,
                email: dataToSave.email,
                name: dataToSave.name,
            },
            ['id'],
        );
    }
}
