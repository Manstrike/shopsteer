import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BaseUserSchema} from 'src/db/baseUser.schema';
import {BaseUserRepository} from './baseUserRepository';

@Module({
    imports: [TypeOrmModule.forFeature([BaseUserSchema])],
    providers: [BaseUserRepository],
    exports: [BaseUserRepository],
})
export class BaseUserGatewayModule {}
