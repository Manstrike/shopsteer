import {LoginResponseBuilder} from 'src/baseUser/login/loginResponseBuilder';

describe('LoginResponseBuilder', () => {
    let responseBuilder: LoginResponseBuilder;

    beforeEach(() => {
        responseBuilder = new LoginResponseBuilder();
    });

    describe('build', () => {
        const token = '[fake-token]';

        it('should build response', async () => {
            const result = {access_token: token};
            const response = await responseBuilder.build('[fake-token]');
            expect(response).toEqual(result);
        });
    });
});
