import {UpdateCompanyResponseBuilder} from 'src/company/update-company/updateCompanyResponseBuilder';
import {Company} from 'src/entities/company-entity/company';

describe('UpdateCompanyResponseBuilder', () => {
    let responseBuilder: UpdateCompanyResponseBuilder;

    beforeEach(() => {
        responseBuilder = new UpdateCompanyResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const isActive = true;
        const company = Company.create({id, name, isActive});

        it('should build response', async () => {
            const result = {id, name, isActive};
            const response = await responseBuilder.build(company);
            expect(response).toEqual(result);
        });
    });
});
