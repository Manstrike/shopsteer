import {CreateCompanyUserInteractor} from 'src/companyUser/create-user/createCompanyUserInteractor';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

describe('CreateCompanyUserInteractor', () => {
    let interactor: CreateCompanyUserInteractor;
    let repository: any;
    let responseBuilder: any;

    beforeEach(() => {
        repository = {
            save: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new CreateCompanyUserInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const role = '[fake-role]';
        const companyId = '[fake-company-id]';
        const baseUserId = '[fake-user-id]';
        const user: any = {role, companyId, baseUserId};

        it('should save entity in db', async () => {
            const userEntity = CompanyUser.create(user);
            await interactor.execute(user);
            expect(repository.save).toHaveBeenCalledWith(userEntity);
        });

        it('should pass data to response builder', async () => {
            const userEntity = CompanyUser.create(user);
            await interactor.execute(user);
            expect(responseBuilder.build).toHaveBeenCalledWith(userEntity);
        });

        it('should return build response', async () => {
            const response = {role, companyId, baseUserId};
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(user);
            expect(result).toBe(response);
        });
    });
});
