import {CreateCompanyResponseBuilder} from 'src/company/create-company/createCompanyResponseBuilder';
import {Company} from 'src/entities/company-entity/company';

describe('CreateCompanyResponseBuilder', () => {
    let responseBuilder: CreateCompanyResponseBuilder;

    beforeEach(() => {
        responseBuilder = new CreateCompanyResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const isActive = true;
        const entity = Company.create({id, name, isActive});

        it('should build response', async () => {
            const result = {id, name, isActive};
            const response = await responseBuilder.build(entity);
            expect(response).toEqual(result);
        });
    });
});
