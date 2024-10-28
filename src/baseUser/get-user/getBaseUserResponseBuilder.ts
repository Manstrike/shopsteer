import {Injectable} from '@nestjs/common';

@Injectable()
export class GetBaseUserResponseBuilder {
    async build(user) {
        return {
            login: user.login,
            phone: user.phone,
            email: user.email,
            name: user.name,
        };
    }
}
