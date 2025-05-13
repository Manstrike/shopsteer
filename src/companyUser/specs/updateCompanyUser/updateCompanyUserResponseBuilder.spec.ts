import {UpdateCompanyUserResponseBuilder} from 'src/companyUser/update-user/updateCompanyUserResponseBuilder';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

describe('UpdateCompanyUserResponseBuilder', () => {
    let responseBuilder: UpdateCompanyUserResponseBuilder;

    beforeEach(() => {
        responseBuilder = new UpdateCompanyUserResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const role = '[fake-role]';
        const baseUserId = '[fake-user-id]';
        const companyId = '[fake-company-id]';
        const userData: any = {id, role, baseUserId, companyId};
        const companyUser = CompanyUser.create(userData);

        it('should build response', async () => {
            const result = {id, role, baseUserId, companyId};
            const response = await responseBuilder.build(companyUser);
            expect(response).toEqual(result);
        });
    });
});
