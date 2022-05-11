"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRentalController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
class CreateRentalController {
    async handle(request, response) {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;
        const createRentalUseCase = tsyringe_1.container.resolve(CreateRentalUseCase_1.CreateRentalUseCase);
        const rental = await createRentalUseCase.execute({
            car_id, expected_return_date, user_id: id
        });
        return response.status(201).json(rental);
    }
}
exports.CreateRentalController = CreateRentalController;
