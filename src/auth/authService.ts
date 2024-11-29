import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

type UserData = {
    id: string;
};

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService) {}

    async sign(userData: UserData) {
        const token = await this.jwt.signAsync(userData, {
            expiresIn: process.env.TOKEN_EXPIRATION_TIME,
            secret: process.env.JWTSECRET,
        });
        return token;
    }

    async verify(token: string) {
        return this.jwt.verifyAsync(token, {secret: process.env.JWTSECRET});
    }
}
