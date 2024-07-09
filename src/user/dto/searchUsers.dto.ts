import {IsOptional, MinLength, IsPhoneNumber, IsString} from 'class-validator';

export class SearchUsersDto {
    @IsString()
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
    role?: string;
}
