import {Injectable} from '@nestjs/common';

@Injectable()
export class RegisterBaseUserResponseBuilder {
    async build(token: string) {
        return {access_token: token};
    }
}
