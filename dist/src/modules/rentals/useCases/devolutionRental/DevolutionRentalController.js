"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevolutionRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const DevolutionRentalUseCase_1 = require("./DevolutionRentalUseCase");
class DevolutionRentalController {
    async handle(request, response) {
        const { id: user_id } = request.user;
        const { id } = request.params;
        const devolutionUseCase = tsyringe_1.container.resolve(DevolutionRentalUseCase_1.DevolutionRentalUseCase);
        const rental = await devolutionUseCase.execute({
            id, user_id
        });
        return response.status(200).json(rental);
    }
}
exports.DevolutionRentalController = DevolutionRentalController;
