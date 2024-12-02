import {Injectable} from '@nestjs/common';
import {Company} from 'src/entities/company-entity/company';

@Injectable()
export class UpdateCompanyResponseBuilder {
    async build(entity: Company) {
        return {
            id: entity.getId(),
            name: entity.getName(),
            isActive: entity.getIsActive(),
        };
    }
}
