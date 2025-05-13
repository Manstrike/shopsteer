import {BadRequestException} from '@nestjs/common';
import {CreateCompanyInteractor} from '../../create-company/createCompanyInteractor';
import {Company} from 'src/entities/company-entity/company';

describe('CreateCompanyIntearactor', () => {
    let interactor: CreateCompanyInteractor;
    let repository: any;
    let responseBuilder: any;

    beforeEach(() => {
        repository = {
            findOne: jest.fn(),
            save: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new CreateCompanyInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const isActive = true;

        beforeEach(() => {
            repository.findOne.mockResolvedValue(null);
        });

        it('should check if company exists in db', async () => {
            await interactor.execute({name, isActive});
            expect(repository.findOne).toHaveBeenCalledWith({name});
        });

        it('should throw error if company name already exists', async () => {
            repository.findOne.mockResolvedValue({id, name, isActive});
            await expect(interactor.execute({name, isActive})).rejects.toThrow(
                new BadRequestException('Company with this name already exists.'),
            );
        });

        it('should save created company entity', async () => {
            const entity = Company.create({
                name,
                isActive,
            });
            await interactor.execute({name, isActive});
            expect(repository.save).toHaveBeenCalledWith(entity);
        });

        it('should pass entity to response builder', async () => {
            const entity = Company.create({
                name,
                isActive,
            });
            await interactor.execute({name, isActive});
            expect(responseBuilder.build).toHaveBeenCalledWith(entity);
        });

        it('should return built response', async () => {
            const response = {id, name, isActive};
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute({name, isActive});
            expect(result).toBe(response);
        });
    });
});
