"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAdmin = void 0;
const UsersRepository_1 = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");
const AppError_1 = require("../../../errors/AppError");
async function ensureAdmin(request, response, next) {
    const { id } = request.user;
    const userRepository = new UsersRepository_1.UsersRepository();
    const user = await userRepository.findById(id);
    if (!user.isAdmin) {
        throw new AppError_1.AppError('User is not an admin!');
    }
    return next();
}
exports.ensureAdmin = ensureAdmin;
