import {NotFoundException} from '@nestjs/common';
import {GetBaseUserInteractor} from 'src/baseUser/get-user/getBaseUserInteractor';

describe('GetBaseUserInteractor', () => {
    let interactor: GetBaseUserInteractor;
    let userRepository: any;
    let responseBuilder: any;

    beforeEach(() => {
        userRepository = {
            findById: jest.fn(),
        };
        responseBuilder = {
            build: jest.fn(),
        };
        interactor = new GetBaseUserInteractor(userRepository, responseBuilder);
    });

    describe('execute()', () => {
        const id = '[fake-id]';

        beforeEach(() => {
            userRepository.findById.mockResolvedValue('fake-user');
        });

        it('should get user from db', async () => {
            await interactor.execute(id);
            expect(userRepository.findById).toHaveBeenCalledWith(id);
        });

        it('should throw an error if user was not found', async () => {
            userRepository.findById.mockResolvedValue(null);
            await expect(interactor.execute(id)).rejects.toThrow(new NotFoundException('User was not found.'));
        });

        it('should pass data to response builder', async () => {
            const result = 'fake-user';
            await interactor.execute(id);
            expect(responseBuilder.build).toHaveBeenCalledWith(result);
        });

        it('should return built response', async () => {
            const response = 'fake-user';
            responseBuilder.build.mockReturnValue(response);
            const result = await interactor.execute(id);
            expect(result).toBe(response);
        });
    });
});
