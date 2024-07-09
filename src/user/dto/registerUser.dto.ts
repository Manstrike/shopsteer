import {IsNotEmpty, MinLength, MaxLength, IsPhoneNumber} from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(6)
    login: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;
}
