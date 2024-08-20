import {UserData} from 'src/entities/user.type';
import {Injectable} from '@nestjs/common';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {SearchOneUser} from './dto/searchOneUser.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {UserEntity} from 'src/db/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async findById(id: string): Promise<UserData | null> {
        return this.userRepository.findOneBy({id});
    }

    async findOne({id, login, phone}: SearchOneUser): Promise<UserData | null> {
        return this.userRepository.findOneBy({id, login, phone});
    }

    async findAll({ids, login, phone, role}: SearchUsersDto): Promise<UserData[] | []> {
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

        if (role) {
            whereConditions['role'] = role;
        }

        return this.userRepository.find({
            where: whereConditions,
        });

        /* const dbResult = this.userRepository.find({
            where: whereConditions,
        });
        if (!dbResult) {
            return dbResult;
        } */
        // create and return entity?
    }

    async save(user: UserData) {
        await this.userRepository.upsert(
            {
                id: user.id,
                login: user.login,
                phone: user.phone,
                role: user.role,
                password: user.password,
            },
            ['id'],
        );
    }
}
