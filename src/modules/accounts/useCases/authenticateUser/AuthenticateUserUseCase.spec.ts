import { DayjsDateProvider } from "../../../../shared/container/providers/DayjsProvider/DayjsDateProvider"
import { IDateProvider } from "../../../../shared/container/providers/DayjsProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokenRepositoryInMemory } from "../../repositories/in-memory/UsersTokenRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: IDateProvider;

describe('Authenticate User', () => {
    
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokenRepositoryInMemory, dateProvider)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })
    
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '00123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    it('should not be able to authenticate an nonexistent database user', async () => {
       await expect(authenticateUserUseCase.execute({
                email: 'anyuser@email',
                password:'1234'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })

    it('should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            driver_license: '5433',
            email: 'user@user.com',
            password: '1234',
            name: 'User Test Error'
        }

        await createUserUseCase.execute(user);
        
        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrect password'
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })
})