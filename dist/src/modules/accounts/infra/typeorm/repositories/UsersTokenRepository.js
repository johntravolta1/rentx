"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTokensRepository = void 0;
const typeorm_1 = require("typeorm");
const UserTokens_1 = require("../entities/UserTokens");
class UsersTokensRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(UserTokens_1.UserTokens);
    }
    async create({ user_id, expires_date, refresh_token }) {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        });
        await this.repository.save(userToken);
        return userToken;
    }
    async findByUserIdAndRefreshToken(user_id, refresh_token) {
        return await this.repository.findOne({
            user_id, refresh_token
        });
    }
    async deleteById(id) {
        this.repository.delete(id);
    }
    async findByRefreshToken(refresh_token) {
        const user = await this.repository.findOne({ refresh_token });
        return user;
    }
}
exports.UsersTokensRepository = UsersTokensRepository;
