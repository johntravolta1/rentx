import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
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
        const token = sign({}, 'd1bb70baa31f1df69628c00632b65eab', {
            subject: user.id,
            expiresIn:'1d'
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }

}

export { AuthenticateUserUseCase}