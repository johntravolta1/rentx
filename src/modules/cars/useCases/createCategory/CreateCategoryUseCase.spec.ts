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
    
import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create category', () => {

    beforeEach(()=> {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })


    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description Test'
        }
        await createCategoryUseCase.execute(category)

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty('id');
    })

    it('should not be able to create a new category with the same name', async () => {
        
        const category = {
            name: 'Category Test',
            description: 'Category description Test'
        }
        await createCategoryUseCase.execute(category)
        
        await expect(createCategoryUseCase.execute(category))
        .rejects.toEqual(new AppError("Category already exists!"))
    })
})