import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Roles} from 'src/user/userRoles';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    role: Roles;
}
