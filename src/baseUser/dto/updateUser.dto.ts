import {MinLength, MaxLength, IsOptional, IsPhoneNumber, IsString, IsEmail} from 'class-validator';

export class UpdateUserDto {
    @IsPhoneNumber()
    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    login?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password?: string;

    @IsEmail()
    @MinLength(6)
    @MaxLength(40)
    @IsString()
    @IsOptional()
    email?: string;

    @MinLength(2)
    @MaxLength(30)
    @IsString()
    @IsOptional()
    name?: string;
}
