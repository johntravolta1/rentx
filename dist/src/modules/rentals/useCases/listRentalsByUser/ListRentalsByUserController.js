"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRentalsByUserController = void 0;
const tsyringe_1 = require("tsyringe");
const ListRentalsByUserUseCase_1 = require("./ListRentalsByUserUseCase");
class ListRentalsByUserController {
    async handle(request, response) {
        const { id } = request.user;
        const listRentalsByUserUseCase = tsyringe_1.container.resolve(ListRentalsByUserUseCase_1.ListRentalsByUserUseCase);
        const rentals = await listRentalsByUserUseCase.execute(id);
        return response.json(rentals);
    }
}
exports.ListRentalsByUserController = ListRentalsByUserController;
