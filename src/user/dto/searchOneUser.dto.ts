import {IsOptional, MinLength, IsPhoneNumber, IsString, IsArray} from 'class-validator';

export class SearchOneUser {
    @IsArray()
    @IsString({each: true})
    @IsOptional()
    id?: string;

    @MinLength(6)
    @IsOptional()
    login?: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: string;
}
