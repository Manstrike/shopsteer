import {Injectable} from '@nestjs/common';
import {User} from 'src/entities/user-entity/user';

@Injectable()
export class UpdateBaseUserResponseBuilder {
    async build(entity: User) {
        return {
            id: entity.getId(),
            name: entity.getName(),
            email: entity.getEmail(),
            phone: entity.getPhone(),
            login: entity.getLogin(),
        };
    }
}
