import {NotFoundException} from '@nestjs/common';
import {UpdateCompanyInteractor} from 'src/company/update-company/updateCompanyInteractor';
import {Company} from 'src/entities/company-entity/company';

describe('UpdateCompanyInteractor', () => {
    let interactor: UpdateCompanyInteractor;
    let responseBuilder: any;
    let repository: any;

    beforeEach(() => {
        repository = {
            findById: jest.fn(),
            save: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new UpdateCompanyInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const isActive = true;
        const dataToUpdate = {name, isActive};

        beforeEach(() => {
            repository.findById.mockResolvedValue({
                id,
                name,
                isActive,
            });
        });

        it('should search for company by id in db', async () => {
            await interactor.execute(id, dataToUpdate);
            expect(repository.findById).toHaveBeenCalledWith(id);
        });

        it('should throw an error if company was not found', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(interactor.execute(id, dataToUpdate)).rejects.toThrow(
                new NotFoundException('Company does not exist.'),
            );
        });

        it('should save updated entity to db', async () => {
            const entity = Company.create({
                id,
                name,
                isActive,
            });
            await interactor.execute(id, dataToUpdate);
            expect(repository.save).toHaveBeenCalledWith(entity);
        });

        it('should pass updated data to response builder', async () => {
            const entity = Company.create({
                id,
                name,
                isActive,
            });
            await interactor.execute(id, dataToUpdate);
            expect(responseBuilder.build).toHaveBeenCalledWith(entity);
        });

        it('should return built response', async () => {
            const response = {
                id,
                name,
                isActive,
            };
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(id, dataToUpdate);
            expect(result).toBe(response);
        });
    });
});
