import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class BaseUserSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    login: string;

    @Column({nullable: false})
    password: string;

    @Column({unique: true})
    phone: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
