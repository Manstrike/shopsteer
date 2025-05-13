import {GetCompanyInteractor} from 'src/company/get-company/getCompanyInteractor';
import {NotFoundException} from '@nestjs/common';

describe('GetCompanyInteractor', () => {
    let interactor: GetCompanyInteractor;
    let responseBuilder: any;
    let repository: any;

    beforeEach(() => {
        repository = {
            findById: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new GetCompanyInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';

        beforeEach(() => {
            repository.findById.mockResolvedValue('[fake-company]');
        });

        it('should search for company by id in db', async () => {
            await interactor.execute(id);
            expect(repository.findById).toHaveBeenCalledWith(id);
        });

        it('should throw an error if company was not found', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(interactor.execute(id)).rejects.toThrow(new NotFoundException('Company was not found.'));
        });

        it('should pass data to response builder', async () => {
            const result = '[fake-company]';
            await interactor.execute(id);
            expect(responseBuilder.build).toHaveBeenCalledWith(result);
        });

        it('should return built result', async () => {
            const response = '[fake-company]';
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(id);
            expect(result).toBe(response);
        });
    });
});
