import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createcarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create car', () => {
    
beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createcarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
})

    it('should be able to create a new car', async () => {
        const car = await createcarUseCase.execute({
            name: "Test Car", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand:"Brand Test" , category_id: 'test category'
        });

        expect(car).toHaveProperty('id')
    })

    it('should not be able to create a car with an existing license plate', () => {
        expect(async () => {
            await createcarUseCase.execute({
                name: "Test Car 1", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand:"Brand Test" , category_id: 'test category'
            });

            await createcarUseCase.execute({
                name: "Test Car 2", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand:"Brand Test" , category_id: 'test category'
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to create a car with available true by default', async() => {
        const car = await createcarUseCase.execute({
            name: "Car Available", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand:"Brand Test" , category_id: 'test category'
        });

        expect(car.available).toBe(true)
    })
})
