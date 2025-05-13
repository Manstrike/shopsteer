import {RegisterBaseUserResponseBuilder} from 'src/baseUser/register-user/registerBaseUserResponseBuilder';

describe('RegisterBaseUserResponseBuilder', () => {
    let responseBuilder: RegisterBaseUserResponseBuilder;

    beforeEach(() => {
        responseBuilder = new RegisterBaseUserResponseBuilder();
    });

    describe('build()', () => {
        const token = '[fake-token]';

        it('should build response', async () => {
            const result = {access_token: token};
            const response = await responseBuilder.build('[fake-token]');
            expect(response).toEqual(result);
        });
    });
});
