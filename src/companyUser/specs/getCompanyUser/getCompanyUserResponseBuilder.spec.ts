import {GetCompanyUserResponseBuilder} from 'src/companyUser/get-user/getCompanyUserResponseBuilder';

describe('GetCompanyUserResponseBuilder', () => {
    let responseBuilder: GetCompanyUserResponseBuilder;

    beforeEach(() => {
        responseBuilder = new GetCompanyUserResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const role = '[fake-role]';
        const baseUserId = '[fake-user-id]';
        const companyId = '[fake-company-id]';
        const user: any = {id, role, baseUserId, companyId};

        it('should build response', async () => {
            const result = {role, baseUserId, companyId};
            const response = await responseBuilder.build(user);
            expect(response).toEqual(result);
        });
    });
});
