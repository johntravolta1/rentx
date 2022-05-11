"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarController = void 0;
const tsyringe_1 = require("tsyringe");
const UpdateUserAvatarUseCase_1 = require("./UpdateUserAvatarUseCase");
class UpdateUserAvatarController {
    async handle(request, response) {
        const { id } = request.user;
        //receber arquivo
        const avatar_file = request.file.filename;
        const updateUserAvatarUseCase = tsyringe_1.container.resolve(UpdateUserAvatarUseCase_1.UpdateUserAvatarUseCase);
        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });
        return response.status(204).send();
    }
}
exports.UpdateUserAvatarController = UpdateUserAvatarController;
