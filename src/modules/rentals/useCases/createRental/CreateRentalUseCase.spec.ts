import dayjs from "dayjs"
import { DayjsDateProvider } from "../../../../shared/container/providers/DayjsProvider/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory"
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
    const Add24Hours = dayjs().add(25, 'hours').toDate()

    beforeEach(() => {
        dayJsProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInMemory)
    })

    it('should be able to create a new rental', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        })

        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: Add24Hours
        })
        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental when there is another open to the same user', async () => {
        
        const car1 = await carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        })

        const car2 = await carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        })

        await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car1.id,
            expected_return_date: Add24Hours
        })

        await expect(createRentalUseCase.execute({
                user_id: '12345',
                car_id: car2.id,
                expected_return_date: Add24Hours
            })
        ).rejects.toEqual(new AppError("There's a rental in progress for this user!"))
    })

    it('should not be able to create a new rental when there is another open to the same car', async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        })

        await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: Add24Hours
        })

        await expect(createRentalUseCase.execute({
                user_id: '65321',
                car_id: car.id,
                expected_return_date: Add24Hours
            })
        ).rejects.toEqual(new AppError('Car is unavailable'))
    })

    

    it('should not be able to create a new rental with total rental time less than 24 hours', async () => {
        
        await expect( createRentalUseCase.execute({
                user_id: '123',
                car_id: '121123',
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError(`The minimal rental time it's 24 hours`))
    })

})