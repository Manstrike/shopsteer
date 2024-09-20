import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserSchema} from './user.schema';
import {ConfigModule} from '@nestjs/config';
import {CompanySchema} from './company.schema';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                type: 'postgres',
                host: process.env.HOST,
                port: Number(process.env.PORT),
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                entities: [UserSchema, CompanySchema],
                synchronize: true,
            }),
        }),
    ],
})
export class DbConnectionModule {}
