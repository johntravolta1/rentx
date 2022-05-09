import { isGetAccessor } from "typescript";
import { DayjsDateProvider } from "../../../../shared/container/providers/DayjsProvider/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "../../repositories/in-memory/UsersTokenRepositoryInMemory";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import { SendForgotMailUseCase } from "./SendForgotPassordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: IUsersTokenRepository;
let mailProvider: MailProviderInMemory

describe('Send forgot mail', () => {


    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail')
        
        await usersRepositoryInMemory.create({
            driver_license: '283829',
            email: 'asdf@test.com',
            name: 'Test',
            password: '1234'
        })

        await sendForgotPasswordMailUseCase.execute('asdf@test.com')

        expect(sendMail).toHaveBeenCalled()


    })

    it('should not be able to send email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('nonuser@does.exists.not')
        ).rejects.toEqual(new AppError('User does not exists!'))
    })

    it('should be able to create an users token', async () => {
        const generateTokenMemory = jest.spyOn(usersRepositoryInMemory, 'create')

        await usersRepositoryInMemory.create({
            driver_license: '32221',
            email: '1332@test.com',
            name: 'Test 2',
            password: '12345'
        })

        await sendForgotPasswordMailUseCase.execute('1332@test.com')

        expect(generateTokenMemory).toBeCalled()
    })
})