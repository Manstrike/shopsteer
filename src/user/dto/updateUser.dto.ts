import {IsNotEmpty, IsPhoneNumber, IsString, IsEnum} from 'class-validator';
import {Roles} from '../userRoles';

export class UpdateUserDto {
    @IsPhoneNumber()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsEnum(Roles)
    role: Roles;
}
