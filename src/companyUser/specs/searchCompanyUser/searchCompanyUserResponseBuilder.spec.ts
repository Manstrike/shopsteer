import {SearchCompanyUsersResponseBuilder} from 'src/companyUser/search-user/searchCompanyUsersResponseBuilder';

describe('SearchCompanyUsersResponseBuilder', () => {
    let responseBuilder: SearchCompanyUsersResponseBuilder;

    beforeEach(() => {
        responseBuilder = new SearchCompanyUsersResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const role = '[fake-role]';
        const companyId = '[fake-company-id]';
        const baseUserId = '[fake-user-id]';
        const companyUser: any = {id, role, companyId, baseUserId};

        it('should build response', async () => {
            const result = [{id, role, companyId, baseUserId}];
            const response = await responseBuilder.build([companyUser]);
            expect(response).toEqual(result);
        });
    });
});
