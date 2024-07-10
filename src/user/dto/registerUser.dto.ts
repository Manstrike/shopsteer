import {IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsEnum, IsString} from 'class-validator';
import {Roles} from '../userRoles';

export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @IsString()
    phone: string;

    @IsString()
    @IsEnum(Roles)
    role: Roles;
}
