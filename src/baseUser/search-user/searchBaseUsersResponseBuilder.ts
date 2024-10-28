import {Injectable} from '@nestjs/common';

@Injectable()
export class SearchBaseUsersResponseBuilder {
    async build(users) {
        return users.map((x) => ({
            id: x.id,
            name: x.name,
            phone: x.phone,
            email: x.email,
            login: x.login,
        }));
    }
}
