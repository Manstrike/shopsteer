import {Injectable} from '@nestjs/common';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

@Injectable()
export class UpdateCompanyUserResponseBuilder {
    async build(entity: CompanyUser) {
        return {
            id: entity.getId(),
            role: entity.getRole(),
            baseUserId: entity.getBaseUserId(),
            companyId: entity.getCompanyId(),
        };
    }
}
