import {Injectable} from '@nestjs/common';
import {UserData} from 'src/entities/user-entity/user.type';

@Injectable()
export class SearchBaseUsersResponseBuilder {
    async build(users: UserData[]) {
        return users.map((x) => ({
            id: x.id,
            name: x.name,
            phone: x.phone,
            email: x.email,
            login: x.login,
        }));
    }
}
