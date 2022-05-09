"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it('should be able to authenticate an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: '00123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(result).toHaveProperty('token');
    }));
    it('should not be able to authenticate an nonexistent database user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: 'anyuser@email',
            password: '1234'
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect"));
    }));
    it('should not be able to authenticate with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: '5433',
            email: 'user@user.com',
            password: '1234',
            name: 'User Test Error'
        };
        yield createUserUseCase.execute(user);
        yield expect(authenticateUserUseCase.execute({
            email: user.email,
            password: 'incorrect password'
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect"));
    }));
});
