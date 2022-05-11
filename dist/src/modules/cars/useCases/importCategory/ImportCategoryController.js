"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportCategoryController = void 0;
const tsyringe_1 = require("tsyringe");
const ImportCategoryUseCase_1 = require("./ImportCategoryUseCase");
class ImportCategoryController {
    async handle(request, response) {
        const { file } = request;
        const importCategoryUseCase = tsyringe_1.container.resolve(ImportCategoryUseCase_1.ImportCategoryUseCase);
        await importCategoryUseCase.execute(file);
        return response.status(201).send();
    }
}
exports.ImportCategoryController = ImportCategoryController;
