"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CategoriesRepositoryInMemory = require("../../repositories/in-memory/CategoriesRepositoryInMemory");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

// describe('Criar categoria', ()=> {
//     it('Espero que 2 + 2 = 4', () => {
//         const soma = 2 + 2;
//         const resultado = 4;
//         expect(soma).toBe(resultado);
//     })
//     it('Espero que 2 + 2 não seja 5', () => {
//         const soma = 2 + 2;
//         const resultado = 5;
//         expect(soma).not.toBe(resultado)
//     })
// })
let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
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
    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(new _AppError.AppError("Category already exists!"));
  });
});