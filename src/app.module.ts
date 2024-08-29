import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DbConnectionModule} from './db/pgconnection.module';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal: true,
        }),
        UserModule,
        DbConnectionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
