import {IsOptional, IsString, IsArray} from 'class-validator';
import {Role} from 'src/companyUser/userRoles';

export class SearchCompanyUsersDto {
    @IsArray()
    @IsString({each: true})
    @IsOptional()
    ids?: [string];

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
