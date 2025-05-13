import {GetCompanyResponseBuilder} from 'src/company/get-company/getCompanyResponseBuilder';

describe('GetCompanyResponseBuilder', () => {
    let responseBuilder: GetCompanyResponseBuilder;

    beforeEach(() => {
        responseBuilder = new GetCompanyResponseBuilder();
    });

    describe('build()', () => {
        const name = '[fake-name]';
        const isActive = true;

        it('should build response', async () => {
            const result = {name, isActive};
            const response = await responseBuilder.build({name, isActive});
            expect(response).toEqual(result);
        });
    });
});
