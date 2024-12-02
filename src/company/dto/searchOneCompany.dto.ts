import {IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean, IsOptional} from 'class-validator';

export class SearchOneCompanyDto {
    @IsString()
    @IsOptional()
    id?: string;

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
