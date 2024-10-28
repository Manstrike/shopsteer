import {Injectable} from '@nestjs/common';

@Injectable()
export class SearchCompanyUsersResponseBuilder {
    async build(users) {
        return users.map((x) => ({
            id: x.id,
            role: x.role,
            companyId: x.companyId,
            baseUserId: x.baseUserId,
        }));
    }
}
