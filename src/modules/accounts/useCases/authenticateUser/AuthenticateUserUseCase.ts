import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DayjsProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokenRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject('DayjsDateProvider')
        private dayJsDateProvider: IDateProvider
    ) {}
    async execute ({email, password}: IRequest) : Promise<IResponse> {

        //Usuário existe
        const user = await this.usersRepository.findByEmail(email)
        if(!user) {
            throw new AppError('Email or password incorrect') //para o hacker não saber que o usuário não existe
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch) {
            throw new AppError('Email or password incorrect') //para o hacker não saber que o usuário não existe
        }

        //Gerar o token
        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token
        })

        const refresh_token = sign({email}, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        })

        const refresh_token_expires_date = this.dayJsDateProvider.addDays(auth.expires_refresh_token_days)

        await this.usersTokenRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date ,
            refresh_token,
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }

        return tokenReturn
    }

}

export { AuthenticateUserUseCase}