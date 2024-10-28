import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import {Role} from 'src/companyUser/userRoles';
import {CompanySchema} from './company.schema';
import {BaseUserSchema} from './baseUser.schema';

@Entity()
export class CompanyUserSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    role: Role;

    @ManyToOne(() => CompanySchema, (company) => company.id)
    @JoinColumn({name: 'companyId'})
    company: CompanySchema;

    @Column()
    companyId: string;

    @OneToOne(() => BaseUserSchema, (user) => user.id)
    @JoinColumn({name: 'baseUserId'})
    baseUser: BaseUserSchema;

    @Column()
    baseUserId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
