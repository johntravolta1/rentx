import dayjs from "dayjs"
import { DayjsDateProvider } from "../../../../shared/container/providers/DayjsProvider/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsProvider: DayjsDateProvider

describe('Create Rental', () => {
    const Add24Hours = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        dayJsProvider = new DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider)
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '121212',
            expected_return_date: Add24Hours
        })
        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental when there is another open to the same user', async () => {
        
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: Add24Hours
            })
            
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: Add24Hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental when there is another open to the same car', async () => {
        
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: Add24Hours
            })
            
            await createRentalUseCase.execute({
                user_id: '65321',
                car_id: '121212',
                expected_return_date: Add24Hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    

    it('should not be able to create a new rental with total rental time less than 24 hours', async () => {
        
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123',
                car_id: '121123',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })

})