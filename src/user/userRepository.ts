import {UserData} from 'src/entities/user.type';
import {Injectable} from '@nestjs/common';
import {SearchUsersDto} from './dto/searchUsers.dto';

@Injectable()
export class UserRepository {
    constructor() {
        //this.dbProvider = dbProvider;
        //this.cacheProvider = cacheProvider;
    }

    async findById(id: string): Promise<string> {
        return id;
    }

    async findOne({ids, login, phone}: SearchUsersDto): Promise<object> {
        return {ids, login, phone};
    }

    async findAll({ids, login, phone, role}: SearchUsersDto): Promise<string[]> {
        const itemsToFind: string[] = [];

        if (ids && Array.isArray(ids)) {
            itemsToFind.push(...ids);
        }
        if (login) {
            itemsToFind.push(login);
        }
        if (phone) {
            itemsToFind.push(phone);
        }
        if (role) {
            itemsToFind.push(role);
        }
        return itemsToFind;
    }

    async save(user: UserData) {
        return user;
    }
}
