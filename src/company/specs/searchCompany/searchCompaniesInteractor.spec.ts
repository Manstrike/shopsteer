import {SearchCompaniesInteractor} from 'src/company/search-company/searchCompaniesInteractor';

describe('SearchCompaniesInteractor', () => {
    let interactor: SearchCompaniesInteractor;
    let responseBuilder: any;
    let repository: any;

    beforeEach(() => {
        repository = {
            findAll: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new SearchCompaniesInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const merchantId = '[fake-merchant-id]';
        const name = '[fake-name]';
        const isActive = true;
        const searchDto: any = {ids: [id], merchantId, name, isActive};

        it('should search for company in db', async () => {
            await interactor.execute(searchDto);
            expect(repository.findAll).toHaveBeenCalledWith({ids: [id], merchantId, name, isActive});
        });

        it('should pass data to response builder', async () => {
            const result = ['[fake-company]'];
            repository.findAll.mockResolvedValue(result);
            await interactor.execute(searchDto);
            expect(responseBuilder.build).toHaveBeenCalledWith(result);
        });

        it('should return built result', async () => {
            const response = ['[fake-company]'];
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(searchDto);
            expect(result).toBe(response);
        });
    });
});
