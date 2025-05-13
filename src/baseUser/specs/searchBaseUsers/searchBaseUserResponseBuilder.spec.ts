import {SearchBaseUsersResponseBuilder} from 'src/baseUser/search-user/searchBaseUsersResponseBuilder';

describe('SearchBaseUsersResponseBuilder', () => {
    let responseBuilder: SearchBaseUsersResponseBuilder;

    beforeEach(() => {
        responseBuilder = new SearchBaseUsersResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const phone = '[fake-phone]';
        const email = '[fake-email]';
        const login = '[fake-login]';
        const password = '[fake-password]';
        const user = {id, name, phone, email, login, password};

        it('should build response', async () => {
            const result = [{id, name, phone, email, login}];
            const response = await responseBuilder.build([user]);
            expect(response).toEqual(result);
        });
    });
});
