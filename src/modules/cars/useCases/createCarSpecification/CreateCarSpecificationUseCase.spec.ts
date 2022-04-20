import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {

    beforeEach(()=> {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
        
    })

    it('should not be able to add a new specification to a non-existent car', async () => {
        
        expect(async ()=> {
            const car_id = '1234'
            const specifications_id = ['54321']
            await createCarSpecificationUseCase.execute({car_id, specifications_id})

        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test Car", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand:"Brand Test" , category_id: 'test category'
        })

        const specification = await specificationsRepositoryInMemory.create({
            description: 'test',
            name: 'test'
        })

        const specifications_id = [specification.id]

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        })

        expect(specificationsCars).toHaveProperty('specifications')
        expect(specificationsCars.specifications.length).toBeGreaterThanOrEqual(1)
    })

})