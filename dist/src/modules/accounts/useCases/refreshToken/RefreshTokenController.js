"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const tsyringe_1 = require("tsyringe");
const RefreshTokenUseCase_1 = require("./RefreshTokenUseCase");
class RefreshTokenController {
    async handle(request, response) {
        const token = request.body.token || request.headers['x-access-token'] || request.query.token;
        const refreshTokenUseCase = tsyringe_1.container.resolve(RefreshTokenUseCase_1.RefreshTokenUseCase);
        const refresh_token = await refreshTokenUseCase.execute(token);
        return response.json(refresh_token);
    }
}
exports.RefreshTokenController = RefreshTokenController;
