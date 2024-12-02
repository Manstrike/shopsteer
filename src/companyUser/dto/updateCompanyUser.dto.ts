import {IsEnum, IsString} from 'class-validator';
import {role, Role} from '../userRoles';

export class UpdateCompanyUserDto {
    @IsString()
    @IsEnum(role)
    role: Role;
}
