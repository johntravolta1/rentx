"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class UsersRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(User_1.User);
    }
    async create({ name, email, password, driver_license, avatar, id }) {
        const user = this.repository.create({
            name, email, password, driver_license, avatar, id
        });
        await this.repository.save(user);
    }
    async findByEmail(email) {
        const user = await this.repository.findOne({ email });
        return user;
    }
    async findById(id) {
        const user = await this.repository.findOne(id);
        return user;
    }
}
exports.UsersRepository = UsersRepository;
