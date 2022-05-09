"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it('should be able to create a new car', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createcarUseCase.execute({
            name: "Test Car", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        expect(car).toHaveProperty('id');
    }));
    it('should not be able to create a car with an existing license plate', () => __awaiter(void 0, void 0, void 0, function* () {
        yield createcarUseCase.execute({
            name: "Test Car 1", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        expect(createcarUseCase.execute({
            name: "Test Car 2", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        })).rejects.toEqual(new AppError_1.AppError('Car already exists!'));
    }));
    it('should be able to create a car with available true by default', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createcarUseCase.execute({
            name: "Car Available", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        expect(car.available).toBe(true);
    }));
});
