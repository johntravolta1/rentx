"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../../../../shared/errors/AppError");
const CarsRepositoryInMemory_1 = require("../../repositories/in-memory/CarsRepositoryInMemory");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
let createcarUseCase;
let carsRepositoryInMemory;
describe('Create car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createcarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carsRepositoryInMemory);
    });
    it('should be able to create a new car', async () => {
        const car = await createcarUseCase.execute({
            name: "Test Car", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        expect(car).toHaveProperty('id');
    });
    it('should not be able to create a car with an existing license plate', async () => {
        await createcarUseCase.execute({
            name: "Test Car 1", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        expect(createcarUseCase.execute({
            name: "Test Car 2", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        })).rejects.toEqual(new AppError_1.AppError('Car already exists!'));
    });
    it('should be able to create a car with available true by default', async () => {
        const car = await createcarUseCase.execute({
            name: "Car Available", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        expect(car.available).toBe(true);
    });
});
