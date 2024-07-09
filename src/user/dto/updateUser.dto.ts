import {IsPhoneNumber, IsString} from 'class-validator';

export class UpdateUserDto {
    @IsPhoneNumber()
    phone: string;

    @IsString()
    role: string;
}
