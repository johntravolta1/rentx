import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokenRepository } from "../IUsersTokenRepository";



class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
    usersToken: UserTokens[] = []
    
    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const usertoken = new UserTokens()

        Object.assign(usertoken, {
            expires_date,
            refresh_token,
            user_id
        })

        this.usersToken.push(usertoken)

        return usertoken;
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const usertoken = this.usersToken.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token)
        return usertoken
    }

    async deleteById(id: string): Promise<void> {
        const usertoken = this.usersToken.find(ut => ut.id === id)
        this.usersToken.splice(
            this.usersToken.indexOf(usertoken)
        )
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.usersToken.find(ut=> ut.refresh_token === refresh_token);
    }

}

export { UsersTokenRepositoryInMemory}