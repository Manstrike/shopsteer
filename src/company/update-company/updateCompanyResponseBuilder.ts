import {Injectable} from '@nestjs/common';

@Injectable()
export class UpdateCompanyResponseBuilder {
    //entity -> dto ?
    async build(entity) {
        return {
            id: entity.getId(),
            name: entity.getName(),
            isActive: entity.getIsActive(),
        };
    }
}
