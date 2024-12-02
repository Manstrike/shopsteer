import {Injectable} from '@nestjs/common';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

@Injectable()
export class CreateCompanyUserResponseBuilder {
    async build(entity: CompanyUser) {
        return {
            id: entity.getId(),
            role: entity.getRole(),
            companyId: entity.getCompanyId(),
            baseUserId: entity.getBaseUserId(),
        };
    }
}
