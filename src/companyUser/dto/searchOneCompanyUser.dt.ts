import {IsOptional, IsString} from 'class-validator';
import {Role} from 'src/companyUser/userRoles';

export class SearchOneCompanyUserDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    role?: Role;

    @IsString()
    @IsOptional()
    companyId?: string;

    @IsString()
    @IsOptional()
    baseUserId: string;
}
