"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordController = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordUserUseCase = require("./ResetPasswordUserUseCase");

class ResetPasswordController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    const resetPasswordUseCase = _tsyringe.container.resolve(_ResetPasswordUserUseCase.ResetPasswordUseCase);

    await resetPasswordUseCase.execute({
      token: String(token),
      password
    });
    return response.send();
  }

}

exports.ResetPasswordController = ResetPasswordController;