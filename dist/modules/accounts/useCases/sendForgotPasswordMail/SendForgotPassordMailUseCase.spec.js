"use strict";

var _DayjsDateProvider = require("../../../../shared/container/providers/DayjsProvider/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokenRepositoryInMemory = require("../../repositories/in-memory/UsersTokenRepositoryInMemory");

var _SendForgotPassordMailUseCase = require("./SendForgotPassordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokenRepositoryInMemory;
let mailProvider;
describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokenRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokenRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPassordMailUseCase.SendForgotMailUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider, mailProvider);
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_license: '283829',
      email: 'asdf@test.com',
      name: 'Test',
      password: '1234'
    });
    await sendForgotPasswordMailUseCase.execute('asdf@test.com');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send email if user does not exists', async () => {
    await expect(sendForgotPasswordMailUseCase.execute('nonuser@does.exists.not')).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it('should be able to create an users token', async () => {
    const generateTokenMemory = jest.spyOn(usersRepositoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      driver_license: '32221',
      email: '1332@test.com',
      name: 'Test 2',
      password: '12345'
    });
    await sendForgotPasswordMailUseCase.execute('1332@test.com');
    expect(generateTokenMemory).toBeCalled();
  });
});