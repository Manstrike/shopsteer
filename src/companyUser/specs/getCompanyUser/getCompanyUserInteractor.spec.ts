import {NotFoundException} from '@nestjs/common';
import {GetCompanyUserInteractor} from 'src/companyUser/get-user/getCompanyUserInteractor';

describe('GetCompanyUserInteractor', () => {
    let interactor: GetCompanyUserInteractor;
    let responseBuilder: any;
    let repository: any;

    beforeEach(() => {
        repository = {
            findById: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new GetCompanyUserInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';

        beforeEach(() => {
            repository.findById.mockResolvedValue('[fake-company-user]');
        });

        it('search for user in db by id', async () => {
            await interactor.execute(id);
            expect(repository.findById).toHaveBeenCalledWith(id);
        });

        it('should throw an error if user was not found', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(interactor.execute(id)).rejects.toThrow(new NotFoundException('User was not found.'));
        });

        it('should pass data to response builder', async () => {
            const result = '[fake-company-user]';
            await interactor.execute(id);
            expect(responseBuilder.build).toHaveBeenCalledWith(result);
        });

        it('should return built response', async () => {
            const response = '[fake-company-user]';
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(id);
            expect(result).toBe(response);
        });
    });
});
