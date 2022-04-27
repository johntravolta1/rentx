import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";
import {v4 as uuidv4} from 'uuid'
import { IDateProvider } from "../../../../shared/container/providers/DayjsProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import {resolve} from 'path'

@injectable()
class SendForgotMailUseCase {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ) {}


    async execute(email: string) :Promise<void> {
        const user = await this.usersRepository.findByEmail(email)
        const templatePath = resolve(__dirname, '..', '..', 'views', 'emails','forgotPassword.hbs' )
        if (!user) {
            throw new AppError('User does not exists!')
        }

        const token = uuidv4();
        
        const expires_date = this.dateProvider.addHours(3)

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(email, 'Recuperação de senha', variables, templatePath)
    }
}

export {SendForgotMailUseCase}