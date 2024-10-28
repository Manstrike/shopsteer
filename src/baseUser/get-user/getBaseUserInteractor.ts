import {Injectable, NotFoundException} from '@nestjs/common';
import {BaseUserRepository} from '../baseUserRepository';
import {GetBaseUserResponseBuilder} from './getBaseUserResponseBuilder';
import {GetBaseUserResponseData} from '../response-types/getBaseUser.type';

@Injectable()
export class GetBaseUserInteractor {
    constructor(
        private baseUserRepository: BaseUserRepository,
        private getBaseUserResponseBuilder: GetBaseUserResponseBuilder,
    ) {}

    async execute(id: string): Promise<GetBaseUserResponseData | null> {
        const user = await this.baseUserRepository.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return this.getBaseUserResponseBuilder.build(user);
    }
}
