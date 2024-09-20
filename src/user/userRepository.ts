import {Injectable} from '@nestjs/common';
import {SearchUsersDto} from './dto/searchUsers.dto';
import {SearchOneUserDto} from './dto/searchOneUser.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, In} from 'typeorm';
import {UserSchema} from 'src/db/user.schema';
import {User} from 'src/entities/user-entity/user';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserSchema)
        private userRepository: Repository<UserSchema>,
    ) {}

    async findById(id: string): Promise<User | null> {
        const dbResult = await this.userRepository.findOneBy({id});
        if (!dbResult) {
            return null;
        }
        const result = User.create(dbResult);
        return result;
    }

    async findOne({id, login, phone}: SearchOneUserDto): Promise<User | null> {
        const dbResult = await this.userRepository.findOneBy({id, login, phone});
        if (!dbResult) {
            return null;
        }
        const result = User.create(dbResult);
        return result;
    }

    async findAll({ids, login, phone, role}: SearchUsersDto): Promise<User[] | []> {
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

        const dbResult = await this.userRepository.find({
            where: whereConditions,
        });
        const result = dbResult.map((x) =>
            User.create({
                id: x.id,
                login: x.login,
                password: x.password,
                role: x.role,
                phone: x.phone,
            }),
        );
        return result;
    }

    async save(user: User) {
        await this.userRepository.upsert(
            {
                id: user.getId(),
                login: user.getLogin(),
                phone: user.getPhone(),
                role: user.getRole(),
                password: user.getPassword(),
            },
            ['id'],
        );
    }
}
