import {IsNotEmpty, IsString, MinLength, MaxLength} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    login: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @IsString()
    password: string;
}
