import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DayjsProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {

    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository : IUsersTokenRepository,
        @inject('DayjsDateProvider')
        private dateProvider : IDateProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({token, password} : IRequest) : Promise<void> {
        const usertoken = await this.usersTokenRepository.findByRefreshToken(token)

        if(!usertoken) {
            throw new AppError('Token invalid!')
        }


        if(this.dateProvider.compareIfBefore(usertoken.expires_date, this.dateProvider.dateNow())) 
        {
            throw new AppError('Token is expired!')
        }

        const user = await this.usersRepository.findById(usertoken.user_id)
        user.password = await hash(password, 8);

        await this.usersRepository.create(user)
        await this.usersTokenRepository.deleteById(usertoken.id)

    }

    
}

export {ResetPasswordUseCase}