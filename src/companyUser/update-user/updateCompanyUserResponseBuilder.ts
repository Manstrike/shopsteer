import {Injectable} from '@nestjs/common';

@Injectable()
export class UpdateCompanyUserResponseBuilder {
    async build(entity) {
        return {
            id: entity.getId(),
            role: entity.getRole(),
            baseUserId: entity.getBaseUserId(),
            companyId: entity.getCompanyId(),
        };
    }
}
