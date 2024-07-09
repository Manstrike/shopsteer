import {UserFactory} from 'src/entities/userFactory';
import {UserData} from 'src/entities/user.interface';
import {Injectable, Inject} from '@nestjs/common';
import {SearchUsersDto} from './dto/searchUsers.dto';

@Injectable()
export class UserRepository {
    private userFactory: UserFactory;

    constructor(/* {dbProvider, userFactory, cacheProvider} */ @Inject(UserFactory) userFactory) {
        // i don't get these injects, only after i added @Inject(UserFactory it worked but if i
        // need dbProvider and cacheProvider in the future how should i add them?

        //this.dbProvider = dbProvider;
        this.userFactory = userFactory;
        //this.cacheProvider = cacheProvider;
    }

    async findById({id}) {
        return id;
    }

    async findOne({id, name, phone}) {
        return {id, name, phone};
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
