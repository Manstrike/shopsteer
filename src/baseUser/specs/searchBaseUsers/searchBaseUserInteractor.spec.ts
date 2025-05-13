import {SearchBaseUsersInteractor} from '../../search-user/searchBaseUsersInteractor';

describe('SearchBaseUserInteractor', () => {
    let baseUserRepository: any;
    let responseBuilder: any;
    let interactor: SearchBaseUsersInteractor;

    beforeEach(() => {
        baseUserRepository = {
            findAll: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new SearchBaseUsersInteractor(baseUserRepository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const login = '[fake-login]';
        const phone = '[fake-phone]';
        const searchUserDto: any = {ids: [id], login, phone};

        it('should get users from db', async () => {
            await interactor.execute(searchUserDto);
            expect(baseUserRepository.findAll).toHaveBeenCalledWith({ids: [id], login, phone});
        });

        it('should pass found data to response builder', async () => {
            const result = ['fake-user'];
            baseUserRepository.findAll.mockResolvedValue(result);
            await interactor.execute(searchUserDto);
            expect(responseBuilder.build).toHaveBeenCalledWith(result);
        });

        it('should return built response', async () => {
            const response = ['fake-user'];
            responseBuilder.build.mockReturnValue(response);
            const result = await interactor.execute(searchUserDto);
            expect(result).toBe(response);
        });
    });
});
