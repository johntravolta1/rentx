"use strict";
// describe('Criar categoria', ()=> {
//     it('Espero que 2 + 2 = 4', () => {
//         const soma = 2 + 2;
//         const resultado = 4;
//         expect(soma).toBe(resultado);
//     })
//     it('Espero que 2 + 2 não seja 5', () => {
//         const soma = 2 + 2;
//         const resultado = 5;
Object.defineProperty(exports, "__esModule", { value: true });
//         expect(soma).not.toBe(resultado)
//     })
// })
const AppError_1 = require("../../../../shared/errors/AppError");
const CategoriesRepositoryInMemory_1 = require("../../repositories/in-memory/CategoriesRepositoryInMemory");
const CreateCategoryUseCase_1 = require("./CreateCategoryUseCase");
let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe('Create category', () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory_1.CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase_1.CreateCategoryUseCase(categoriesRepositoryInMemory);
    });
    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description Test'
        };
        await createCategoryUseCase.execute(category);
        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty('id');
    });
    it('should not be able to create a new category with the same name', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description Test'
        };
        await createCategoryUseCase.execute(category);
        await expect(createCategoryUseCase.execute(category))
            .rejects.toEqual(new AppError_1.AppError("Category already exists!"));
    });
});
