import {IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsString, IsEmail} from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsEmail()
    @MinLength(6)
    @MaxLength(40)
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    @IsString()
    name: string;
}
