"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSpecificationController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateSpecificationUseCase_1 = require("./CreateSpecificationUseCase");
class CreateSpecificationController {
    async handle(request, response) {
        const { name, description } = request.body;
        const createSpecificationUseCase = tsyringe_1.container.resolve(CreateSpecificationUseCase_1.CreateSpecificationUseCase);
        await createSpecificationUseCase.execute({ name, description });
        return response.status(201).send();
    }
}
exports.CreateSpecificationController = CreateSpecificationController;
