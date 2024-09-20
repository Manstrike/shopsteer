import {IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean, IsOptional} from 'class-validator';

export class UpdateCompanyDto {
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
