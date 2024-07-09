import {IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @MinLength(6)
    login: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}
