import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DbConnectionModule} from './db/pgconnection.module';
import {ConfigModule} from '@nestjs/config';
import {CompanyModule} from './company/company.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal: true,
        }),
        UserModule,
        CompanyModule,
        DbConnectionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
