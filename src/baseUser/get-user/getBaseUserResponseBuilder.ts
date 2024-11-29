import {Injectable} from '@nestjs/common';
import {UserData} from 'src/entities/user-entity/user.type';

@Injectable()
export class GetBaseUserResponseBuilder {
    async build(user: UserData) {
        return {
            login: user.login,
            phone: user.phone,
            email: user.email,
            name: user.name,
        };
    }
}
