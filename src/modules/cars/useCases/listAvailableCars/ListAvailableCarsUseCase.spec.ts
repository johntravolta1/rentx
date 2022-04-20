import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })


    it('should be able to list all available cars', async () => {

        const car = await carsRepositoryInMemory.create({
            name: "CarTest1", 
            description: "Carro com espaço",
            daily_rate: 110, 
            license_plate: "DEF-1122", 
            fine_amount: 40, 
            brand: "Audi", 
            category_id: "idtest"
        })

        const cars = await listAvailableCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by brand', async() => {
        const car = await carsRepositoryInMemory.create({
            name: "CarTest2", 
            description: "Carro com espaço",
            daily_rate: 110, 
            license_plate: "DEF-1122", 
            fine_amount: 40, 
            brand: "Car_brand_test", 
            category_id: "idtest"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand:'Car_brand_test'
        })

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by name', async() => {
        const car = await carsRepositoryInMemory.create({
            name: "CarTest3", 
            description: "Carro com espaço",
            daily_rate: 110, 
            license_plate: "DEF-1122", 
            fine_amount: 40, 
            brand: "Car_brand_test", 
            category_id: "idtest"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name:'CarTest3'
        })


        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by category', async() => {
        const car = await carsRepositoryInMemory.create({
            name: "CarTest4", 
            description: "Carro com espaço",
            daily_rate: 110, 
            license_plate: "DEF-1122", 
            fine_amount: 40, 
            brand: "Car_brand_test", 
            category_id: "1345"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id:'1345'
        })


        expect(cars).toEqual([car])
    })
})