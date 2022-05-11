"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAvailableCarsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
class ListAvailableCarsController {
    async handle(request, response) {
        const { brand, name, category_id } = request.query;
        const listAvailableCarsUseCase = tsyringe_1.container.resolve(ListAvailableCarsUseCase_1.ListAvailableCarsUseCase);
        const cars = await listAvailableCarsUseCase.execute({
            brand: brand,
            name: name,
            category_id: category_id
        });
        return response.json(cars);
    }
}
exports.ListAvailableCarsController = ListAvailableCarsController;
