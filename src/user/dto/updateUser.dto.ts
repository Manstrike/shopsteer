import {MinLength, MaxLength, IsOptional, IsPhoneNumber, IsString, IsEnum} from 'class-validator';
import {Roles} from '../userRoles';

export class UpdateUserDto {
    @IsPhoneNumber()
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    login?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password?: string;

    @IsOptional()
    @IsEnum(Roles)
    role?: Roles;
}
