import {IsOptional, MinLength, IsPhoneNumber, IsString, IsArray} from 'class-validator';

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
}
