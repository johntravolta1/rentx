"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const tsyringe_1 = require("tsyringe");
const ResetPasswordUserUseCase_1 = require("./ResetPasswordUserUseCase");
class ResetPasswordController {
    async handle(request, response) {
        const { token } = request.query;
        const { password } = request.body;
        const resetPasswordUseCase = tsyringe_1.container.resolve(ResetPasswordUserUseCase_1.ResetPasswordUseCase);
        await resetPasswordUseCase.execute({ token: String(token), password });
        return response.send();
    }
}
exports.ResetPasswordController = ResetPasswordController;
