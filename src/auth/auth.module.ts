import {Module} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthService} from './authService';

@Module({
    providers: [JwtService, AuthService],
    exports: [JwtService, AuthService],
})
export class AuthModule {}
