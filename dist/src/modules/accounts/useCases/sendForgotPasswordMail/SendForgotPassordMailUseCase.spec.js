"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DayjsDateProvider_1 = require("../../../../shared/container/providers/DayjsProvider/DayjsDateProvider");
const MailProviderInMemory_1 = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const AppError_1 = require("../../../../shared/errors/AppError");
const UsersRepositoryInMemory_1 = require("../../repositories/in-memory/UsersRepositoryInMemory");
const UsersTokenRepositoryInMemory_1 = require("../../repositories/in-memory/UsersTokenRepositoryInMemory");
const SendForgotPassordMailUseCase_1 = require("./SendForgotPassordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokenRepositoryInMemory;
let mailProvider;
describe('Send forgot mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory_1.UsersTokenRepositoryInMemory();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPassordMailUseCase_1.SendForgotMailUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider, mailProvider);
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
        await expect(sendForgotPasswordMailUseCase.execute('nonuser@does.exists.not')).rejects.toEqual(new AppError_1.AppError('User does not exists!'));
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
