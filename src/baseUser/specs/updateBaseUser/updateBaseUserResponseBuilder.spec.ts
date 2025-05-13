import {UpdateBaseUserResponseBuilder} from 'src/baseUser/update-user/updateBaseUserResponseBuilder';
import {User} from 'src/entities/user-entity/user';

describe('UpdateBaseUserResponseBuilder', () => {
    let responseBuilder: UpdateBaseUserResponseBuilder;

    beforeEach(() => {
        responseBuilder = new UpdateBaseUserResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const email = '[fake-email]';
        const phone = '[fake-phone]';
        const login = '[fake-login]';
        const password = '[fake-password]';
        const user = User.create({id, name, password, email, phone, login});

        it('should build the response', async () => {
            const result = {id, name, email, phone, login};
            const response = await responseBuilder.build(user);
            expect(response).toEqual(result);
        });
    });
});
