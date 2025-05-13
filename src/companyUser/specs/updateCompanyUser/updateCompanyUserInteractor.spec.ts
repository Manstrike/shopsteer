import {BadRequestException} from '@nestjs/common';
import {UpdateCompanyUserInteractor} from 'src/companyUser/update-user/updateCompanyUserInteractor';
import {CompanyUser} from 'src/entities/company-user-entity/companyUser';

describe('Name of the group', () => {
    let interactor: UpdateCompanyUserInteractor;
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
        interactor = new UpdateCompanyUserInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const role = '[fake-role]';
        const baseUserId = '[fake-user-id]';
        const companyId = '[fake-company-id]';
        const dataToUpdate: any = {role, baseUserId, companyId};

        beforeEach(() => {
            repository.findById.mockResolvedValue({
                id,
                role,
                baseUserId,
                companyId,
            });
        });

        it('should check if user exists in db', async () => {
            await interactor.execute(id, dataToUpdate);
            expect(repository.findById).toHaveBeenCalledWith(id);
        });

        it('should throw an error if user was not found', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(interactor.execute(id, dataToUpdate)).rejects.toThrow(
                new BadRequestException('User does not exist.'),
            );
        });

        it('should save updated entity to db', async () => {
            const companyUser: any = {
                id,
                role,
                baseUserId,
                companyId,
            };
            const entity = CompanyUser.create(companyUser);
            await interactor.execute(id, dataToUpdate);
            expect(repository.save).toHaveBeenCalledWith(entity);
        });

        it('should pass data to response builder', async () => {
            const companyUser: any = {
                id,
                role,
                baseUserId,
                companyId,
            };
            const entity = CompanyUser.create(companyUser);
            await interactor.execute(id, dataToUpdate);
            expect(responseBuilder.build).toHaveBeenCalledWith(entity);
        });

        it('should return built response', async () => {
            const response = {
                id,
                role,
                baseUserId,
                companyId,
            };
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(id, dataToUpdate);
            expect(result).toBe(response);
        });
    });
});
