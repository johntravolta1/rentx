import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "../../../repositories/IUsersTokenRepository";
import { UserTokens } from "../entities/UserTokens";


class UsersTokensRepository implements IUsersTokenRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }
   
    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken;
    }

    async findByUserIdAndRefreshToken(user_id: string,refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOne({
            user_id, refresh_token
        })
    }

    async deleteById(id: string): Promise<void> {
        this.repository.delete(id)
    }
    
    
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const user = await this.repository.findOne({ refresh_token })
        return user;
    }

}

export {UsersTokensRepository}