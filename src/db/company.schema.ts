import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import {UserSchema} from './user.schema';

@Entity()
export class CompanySchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => UserSchema, (user) => user.id)
    @JoinColumn({name: 'merchantId'})
    merchant: string;

    @Column()
    merchantId: string;

    @Column()
    name: string;

    @Column()
    isActive: boolean;
}
