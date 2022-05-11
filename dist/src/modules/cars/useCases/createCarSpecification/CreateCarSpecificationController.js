"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
class CreateCarSpecificationController {
    async handle(request, response) {
        const { id } = request.params;
        const { specifications_id } = request.body;
        const createCarSpecificationUseCase = tsyringe_1.container.resolve(CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase);
        const cars = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id
        });
        return response.json(cars);
    }
}
exports.CreateCarSpecificationController = CreateCarSpecificationController;
