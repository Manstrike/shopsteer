import {IsOptional, MinLength, IsPhoneNumber, IsString, IsArray, IsEnum} from 'class-validator';
import {Roles} from '../userRoles';

export class SearchUsersDto {
    @IsArray()
    @IsString({each: true})
    @IsOptional()
    ids?: [string];

    @MinLength(6)
    @IsOptional()
    login?: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    @IsEnum(Roles)
    role?: Roles;
}
