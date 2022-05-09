"use strict";

var _DayjsDateProvider = require("../../../../shared/container/providers/DayjsProvider/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("../../repositories/in-memory/UsersTokenRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokenRepositoryInMemory;
let dateProvider;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokenRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      driver_license: '00123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test'
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
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
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
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
});