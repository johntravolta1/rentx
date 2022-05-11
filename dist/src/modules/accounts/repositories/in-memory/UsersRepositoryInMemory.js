"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositoryInMemory = void 0;
const User_1 = require("../../infra/typeorm/entities/User");
class UsersRepositoryInMemory {
    constructor() {
        this.users = [];
    }
    async create({ name, email, password, driver_license }) {
        const user = new User_1.User();
        Object.assign(user, { name, email, password, driver_license });
        this.users.push(user);
    }
    async findByEmail(email) {
        return this.users.find(u => u.email === email);
    }
    async findById(id) {
        return this.users.find(u => u.id === id);
    }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;
