import {IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean} from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}
