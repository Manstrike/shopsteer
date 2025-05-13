import {BadRequestException} from '@nestjs/common';
import {LoginInteractor} from 'src/baseUser/login/loginInteractor';
import {PasswordHashService} from 'src/passwordHashService';

describe('LoginInteractor', () => {
    let interactor: LoginInteractor;
    let repository: any;
    let responseBuilder: any;
    let authService: any;

    beforeEach(() => {
        repository = {
            findOne: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        authService = {
            sign: jest.fn(),
        };
        interactor = new LoginInteractor(repository, responseBuilder, authService);
    });

    describe('execute()', () => {
        const login = '[fake-login]';
        const password = '[fake-password]';
        const token = '[fake-token]';
        const credentials = {login, password};
        beforeEach(() => {
            jest.spyOn(PasswordHashService, 'compare').mockResolvedValue(true);
            authService.sign.mockResolvedValue(token);
            repository.findOne.mockResolvedValue({
                id: '[fake-id]',
                login: '[fake-login]',
                password: '[hashed-password]',
            });
        });

        it('should check if user login exists in db', async () => {
            await interactor.execute(credentials);
            expect(repository.findOne).toHaveBeenCalledWith({login});
        });

        it('should throw an error if user was not found', async () => {
            repository.findOne.mockResolvedValue(null);
            await expect(interactor.execute(credentials)).rejects.toThrow(
                new BadRequestException('User does not exist.'),
            );
        });

        it('should compare provided password to hashed from db', async () => {
            await interactor.execute(credentials);
            expect(PasswordHashService.compare).toHaveBeenCalledWith(credentials.password, '[hashed-password]');
        });

        it('should throw an error if passwords do not match', async () => {
            jest.spyOn(PasswordHashService, 'compare').mockResolvedValue(false);
            await expect(interactor.execute(credentials)).rejects.toThrow(new BadRequestException('Invalid password.'));
        });

        it('should generate token', async () => {
            await interactor.execute(credentials);
            expect(authService.sign).toHaveBeenCalledWith({id: '[fake-id]'});
        });

        it('should pass token to response builder', async () => {
            await interactor.execute(credentials);
            expect(responseBuilder.build).toHaveBeenCalledWith('[fake-token]');
        });

        it('should return token in built response', async () => {
            const response = {access_token: '[fake-token]'};
            responseBuilder.build.mockResolvedValue(response);
            const result = await interactor.execute(credentials);
            expect(result).toBe(response);
        });
    });
});
