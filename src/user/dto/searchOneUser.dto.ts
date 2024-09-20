import {IsOptional, MinLength, IsPhoneNumber, IsString} from 'class-validator';

export class SearchOneUserDto {
    @IsOptional()
    @IsString()
    id?: string;

    @MinLength(6)
    @IsString()
    @IsOptional()
    login?: string;

    @IsPhoneNumber()
    @IsOptional()
    @IsString()
    phone?: string;
}
