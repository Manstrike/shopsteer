import {IsNotEmpty, MinLength, MaxLength, IsString} from 'class-validator';
import {Role} from '../userRoles';

export class CreateCompanyUserDto {
    @IsNotEmpty()
    @IsString()
    role: Role;

    @IsString()
    @MinLength(30)
    @MaxLength(40)
    companyId: string;

    @IsString()
    @MinLength(30)
    @MaxLength(40)
    baseUserId: string;
}
