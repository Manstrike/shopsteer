import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Roles} from 'src/user/userRoles';

@Entity()
export class UserSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    login: string;

    @Column()
    password: string;

    @Column({unique: true})
    phone: string;

    @Column()
    role: Roles;
}
