"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUserController = void 0;
const tsyringe_1 = require("tsyringe");
const ProfileUserUseCase_1 = require("./ProfileUserUseCase");
class ProfileUserController {
    async handle(request, response) {
        const { id } = request.user;
        const profileUserUseCase = tsyringe_1.container.resolve(ProfileUserUseCase_1.ProfileUserUseCase);
        const user = await profileUserUseCase.execute(id);
        return response.json(user);
    }
}
exports.ProfileUserController = ProfileUserController;
