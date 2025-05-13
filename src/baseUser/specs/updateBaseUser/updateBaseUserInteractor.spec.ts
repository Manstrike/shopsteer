import {BadRequestException, ForbiddenException} from '@nestjs/common';
import {UpdateBaseUserInteractor} from 'src/baseUser/update-user/updateBaseUserInteractor';
import {PasswordHashService} from 'src/passwordHashService';
import {User} from 'src/entities/user-entity/user';

describe('UpdateBaseUserInteractor', () => {
    let interactor: UpdateBaseUserInteractor;
    let repository: any;
    let responseBuilder: any;

    beforeEach(() => {
        repository = {
            findById: jest.fn(),
            save: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new UpdateBaseUserInteractor(repository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';
        const name = '[fake-name]';
        const password = '[fake-password]';
        const phone = '[fake-phone';
        const email = '[fake-email]';
        const login = '[fake-login]';
        const requestUserId = '[fake-id]';
        const dataToUpdate = {
            name,
            password,
            phone,
            email,
            login,
        };

        beforeEach(() => {
            repository.findById.mockResolvedValue({
                id,
                login,
                password,
                phone,
                email,
                name,
            });
            jest.spyOn(PasswordHashService, 'hash').mockResolvedValue('[fake-hash]');
        });

        it('should check if user exists in db', async () => {
            await interactor.execute(id, dataToUpdate, requestUserId);
            expect(repository.findById).toHaveBeenCalledWith(id);
        });

        it('should throw error if user was not found', async () => {
            repository.findById.mockResolvedValue(null);
            await expect(interactor.execute(id, dataToUpdate, requestUserId)).rejects.toThrow(
                new BadRequestException('User does not exist.'),
            );
        });

        it('should throw an error if user id and request user id do not match', async () => {
            const invalidRequestId = '[fake-invalid-id]';
            await expect(interactor.execute(id, dataToUpdate, invalidRequestId)).rejects.toThrow(
                new ForbiddenException(),
            );
        });

        it('should hash new password if it was provided', async () => {
            await interactor.execute(id, dataToUpdate, requestUserId);
            expect(PasswordHashService.hash).toHaveBeenCalledWith(dataToUpdate.password);
        });

        // TODO not sure about how to mock User.create
        // is it even needed here?
        xit('should create user entity with updated data', async () => {
            await interactor.execute(id, dataToUpdate, requestUserId);
            expect(jest.spyOn(User, 'create')).toHaveBeenCalledWith({
                id,
                login: dataToUpdate.login,
                password: '[fake-hash]',
                phone: dataToUpdate.phone,
                name: dataToUpdate.name,
                email: dataToUpdate.email,
            });
        });

        it('should save updated user in db', async () => {
            const entity = User.create({
                id,
                login: dataToUpdate.login,
                password: '[fake-hash]',
                phone: dataToUpdate.phone,
                name: dataToUpdate.name,
                email: dataToUpdate.email,
            });
            await interactor.execute(id, dataToUpdate, requestUserId);
            expect(repository.save).toHaveBeenCalledWith(entity);
        });

        it('should pass updated user entity to response builder', async () => {
            await interactor.execute(id, dataToUpdate, requestUserId);
            expect(responseBuilder.build).toHaveBeenCalledWith({
                id,
                login: dataToUpdate.login,
                password: '[fake-hash]',
                phone: dataToUpdate.phone,
                name: dataToUpdate.name,
                email: dataToUpdate.email,
            });
        });

        it('should return built response', async () => {
            const response = {
                id,
                login: dataToUpdate.login,
                phone: dataToUpdate.phone,
                name: dataToUpdate.name,
                email: dataToUpdate.email,
            };
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(id, dataToUpdate, requestUserId);
            expect(result).toBe(response);
        });
    });
});
