"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordMailController = void 0;
const tsyringe_1 = require("tsyringe");
const SendForgotPassordMailUseCase_1 = require("./SendForgotPassordMailUseCase");
class SendForgotPasswordMailController {
    async handle(request, response) {
        const { email } = request.body;
        const sendForgotMailUseCase = tsyringe_1.container.resolve(SendForgotPassordMailUseCase_1.SendForgotMailUseCase);
        await sendForgotMailUseCase.execute(email);
        return response.send();
    }
}
exports.SendForgotPasswordMailController = SendForgotPasswordMailController;
