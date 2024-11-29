import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BaseUserModule} from './baseUser/baseUser.module';
import {DbConnectionModule} from './db/pgconnection.module';
import {ConfigModule} from '@nestjs/config';
import {CompanyModule} from './company/company.module';
import {CompanyUserModule} from './companyUser/companyUser.module';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from './auth/authGuard';
import {JwtService} from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal: true,
        }),
        BaseUserModule,
        CompanyModule,
        CompanyUserModule,
        DbConnectionModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
