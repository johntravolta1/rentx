"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DayjsDateProvider_1 = require("../../../../shared/container/providers/DayjsProvider/DayjsDateProvider");
const AppError_1 = require("../../../../shared/errors/AppError");
const UsersRepositoryInMemory_1 = require("../../repositories/in-memory/UsersRepositoryInMemory");
const UsersTokenRepositoryInMemory_1 = require("../../repositories/in-memory/UsersTokenRepositoryInMemory");
const CreateUserUseCase_1 = require("../createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokenRepositoryInMemory;
let dateProvider;
describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory_1.UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it('should be able to authenticate an user', async () => {
        const user = {
            driver_license: '00123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(result).toHaveProperty('token');
    });
    it('should not be able to authenticate an nonexistent database user', async () => {
        await expect(authenticateUserUseCase.execute({
            email: 'anyuser@email',
            password: '1234'
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect"));
    });
    it('should not be able to authenticate with incorrect password', async () => {
        const user = {
            driver_license: '5433',
            email: 'user@user.com',
            password: '1234',
            name: 'User Test Error'
        };
        await createUserUseCase.execute(user);
        await expect(authenticateUserUseCase.execute({
            email: user.email,
            password: 'incorrect password'
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect"));
    });
});
