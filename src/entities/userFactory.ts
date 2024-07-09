import {Injectable} from '@nestjs/common';
import {User} from './user';
import {UserData} from './user.interface';

@Injectable()
export class UserFactory {
    create(data: UserData) {
        return new User(data);
    }
}
