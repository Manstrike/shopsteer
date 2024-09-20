import {IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean, IsOptional, IsArray} from 'class-validator';

export class SearchCompaniesDto {
    @IsArray()
    @IsString({each: true})
    @IsOptional()
    ids?: [string];

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    merchantId?: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    @IsString()
    @IsOptional()
    name?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
