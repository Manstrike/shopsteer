import {SearchCompaniesResponseBuilder} from 'src/company/search-company/searchCompaniesResponseBuilder';

describe('SearchCompaniesResponseBuilder', () => {
    let responseBuilder: SearchCompaniesResponseBuilder;

    beforeEach(() => {
        responseBuilder = new SearchCompaniesResponseBuilder();
    });

    describe('build()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const isActive = true;
        const company = {id, name, isActive};

        it('should build response', async () => {
            const result = [{id, name, isActive}];
            const response = await responseBuilder.build([company]);
            expect(response).toEqual(result);
        });
    });
});
