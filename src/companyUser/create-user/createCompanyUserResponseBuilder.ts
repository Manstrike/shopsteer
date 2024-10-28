import {Injectable} from '@nestjs/common';

@Injectable()
export class CreateCompanyUserResponseBuilder {
    async build(entity) {
        return {
            id: entity.getId(),
            role: entity.getRole(),
            companyId: entity.getCompanyId(),
            baseUserId: entity.getBaseUserId(),
        };
    }
}
