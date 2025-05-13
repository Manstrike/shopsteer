import {GetBaseUserResponseBuilder} from 'src/baseUser/get-user/getBaseUserResponseBuilder';

describe('GetBaseUserResponseBuilder', () => {
    let responseBuilder: GetBaseUserResponseBuilder;

    beforeEach(() => {
        responseBuilder = new GetBaseUserResponseBuilder();
    });

    describe('build()', () => {
        const name = '[fake-name]';
        const login = '[fake-login]';
        const email = '[fake-email]';
        const phone = '[fake-phone';
        const password = '[fake-password]';
        const user = {name, login, phone, email, password};

        it('should build response', async () => {
            const result = {name, login, phone, email};
            const response = await responseBuilder.build(user);
            expect(response).toEqual(result);
        });
    });
});
