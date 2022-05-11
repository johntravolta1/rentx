"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
class CreateCarController {
    async handle(request, response) {
        const { name, description, daily_rate, license_plate, fine_amount, brand, category_id } = request.body;
        const createCarUseCar = tsyringe_1.container.resolve(CreateCarUseCase_1.CreateCarUseCase);
        const car = await createCarUseCar.execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id });
        return response.status(201).json(car);
    }
}
exports.CreateCarController = CreateCarController;
