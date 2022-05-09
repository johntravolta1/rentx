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
const SpecificationsRepositoryInMemory_1 = require("../../repositories/in-memory/SpecificationsRepositoryInMemory");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe('Create Car Specification', () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it('should not be able to add a new specification to a non-existent car', () => __awaiter(void 0, void 0, void 0, function* () {
        const car_id = '1234';
        const specifications_id = ['54321'];
        yield expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })).rejects.toEqual(new AppError_1.AppError('Car does not exists!'));
    }));
    it('should be able to add a new specification to the car', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Test Car", description: "Test Description", daily_rate: 100, license_plate: 'TEST1234', fine_amount: 60, brand: "Brand Test", category_id: 'test category'
        });
        const specification = yield specificationsRepositoryInMemory.create({
            description: 'test',
            name: 'test'
        });
        const specifications_id = [specification.id];
        const specificationsCars = yield createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });
        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications.length).toBeGreaterThanOrEqual(1);
    }));
});
