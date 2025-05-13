import {SearchCompanyUsersInteractor} from 'src/companyUser/search-user/searchCompanyUsersInteractor';

describe('SearchCompanyUsersInteractor', () => {
    let interactor: SearchCompanyUsersInteractor;
    let repository: any;
    let responseBuilder: any;

    beforeEach(() => {
        repository = {
            findAll: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new SearchCompanyUsersInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const role = '[fake-role]';
        const companyId = '[fake-company-id]';
        const baseUserId = '[fake-base-user-id]';
        const searchUserDto: any = {ids: [id], role, companyId, baseUserId};

        it('should search fo user in db', async () => {
            await interactor.execute(searchUserDto);
            expect(repository.findAll).toHaveBeenCalledWith({ids: [id], role, companyId, baseUserId});
        });

        it('should pass data to response builder', async () => {
            const result = ['[fake-company-user]'];
            repository.findAll.mockResolvedValue(result);
            await interactor.execute(searchUserDto);
            expect(responseBuilder.build).toHaveBeenCalledWith(result);
        });

        it('should return built result', async () => {
            const response = ['[fake-user]'];
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(searchUserDto);
            expect(result).toBe(response);
        });
    });
});
