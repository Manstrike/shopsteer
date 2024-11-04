import {Injectable} from '@nestjs/common';

@Injectable()
export class UpdateBaseUserResponseBuilder {
    // entity -> dto?
    async build(entity) {
        return {
            id: entity.getId(),
            name: entity.getName(),
            email: entity.getEmail(),
            phone: entity.getPhone(),
            login: entity.getLogin(),
        };
    }
}
