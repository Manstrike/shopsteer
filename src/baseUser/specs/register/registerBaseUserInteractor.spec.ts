import {BadRequestException} from '@nestjs/common';
import {RegisterBaseUserInteractor} from 'src/baseUser/register-user/registerBaseUserInteractor';
import {User} from 'src/entities/user-entity/user';
import {PasswordHashService} from 'src/passwordHashService';

describe('RegisterBaseUserInteractor', () => {
    let interactor: RegisterBaseUserInteractor;
    let repository: any;
    let responseBuilder: any;
    let authService: any;

    beforeEach(() => {
        repository = {
            findOne: jest.fn(),
            save: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        authService = {
            sign: jest.fn(),
        };
        interactor = new RegisterBaseUserInteractor(repository, responseBuilder, authService);
    });

    describe('execute()', () => {
        const login = '[fake-login]';
        const password = '[fake-password]';
        const phone = '[fake-phone]';
        const email = '[fake-email]';
        const name = '[fake-name]';
        const token = '[fake-token]';
        const credentials = {
            login,
            password,
            phone,
            email,
            name,
        };
        beforeEach(() => {
            jest.spyOn(PasswordHashService, 'hash').mockResolvedValue('[fake-hash]');
            repository.findOne.mockResolvedValue(null);
            authService.sign.mockResolvedValue(token);
        });

        it('should check if user already exists id db', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(repository.findOne).toHaveBeenCalledWith({login});
        });

        it('should throw an error if user was found', async () => {
            repository.findOne.mockResolvedValue('[fake-user]');
            await expect(interactor.execute(credentials)).rejects.toThrow(
                new BadRequestException('User with this login already exists.'),
            );
        });

        it('should hash password using PasswordHashService', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(PasswordHashService.hash).toHaveBeenCalledWith(credentials.password);
        });

        // TODO not sure about how to mock User.create
        // is it even needed here?
        xit('should create an entity using provided data and hashed password', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(jest.spyOn(User, 'create')).toHaveBeenCalledWith({
                login,
                password: '[fake-hash]',
                phone,
                email,
                name,
            });
        });

        it('should save user entity in db', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            // no mock?
            const entity = User.create({
                login,
                password: '[fake-hash]',
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(repository.save).toHaveBeenCalledWith(entity);
        });

        it('should get saved user from db', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(repository.findOne({login}));
        });

        it('should generate a token', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(authService.sign).toHaveBeenCalledWith({id: '[fake-id]'});
        });

        it('should pass token to response builder', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            await interactor.execute(credentials);
            expect(responseBuilder.build).toHaveBeenCalledWith('[fake-token]');
        });

        it('should return built response', async () => {
            repository.findOne.mockResolvedValueOnce(null);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login,
                password,
                phone,
                email,
                name,
            });
            const response = {access_token: '[fake-token]'};
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(credentials);
            expect(result).toBe(response);
        });
    });
});
