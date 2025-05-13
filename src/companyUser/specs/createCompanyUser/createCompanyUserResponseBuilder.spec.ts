import {CreateCompanyUserResponseBuilder} from 'src/companyUser/create-user/createCompanyUserResponseBuilder';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

describe('CreateCompanyUserResponseBuilder', () => {
    let responseBuilder: CreateCompanyUserResponseBuilder;

    beforeEach(() => {
        responseBuilder = new CreateCompanyUserResponseBuilder();
    });

    describe('build()', () => {
        const role = '[fake-role]';
        const companyId = '[fake-company-id';
        const baseUserId = '[fake-user-id]';
        const user: any = {role, companyId, baseUserId};
        const entity = CompanyUser.create(user);

        it('should return built response', async () => {
            const result = {role, companyId, baseUserId};
            const response = await responseBuilder.build(entity);
            expect(response).toEqual(result);
        });
    });
});
