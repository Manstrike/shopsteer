import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {DbConnectionModule} from './db/pgconnection.module';

@Module({
    imports: [UserModule, DbConnectionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
