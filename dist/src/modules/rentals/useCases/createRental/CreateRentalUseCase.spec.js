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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const DayjsDateProvider_1 = require("../../../../shared/container/providers/DayjsProvider/DayjsDateProvider");
const AppError_1 = require("../../../../shared/errors/AppError");
const CarsRepositoryInMemory_1 = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");
const RentalsRepositoryInMemory_1 = require("../../repositories/in-memory/RentalsRepositoryInMemory");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayJsProvider;
let carsRepositoryInMemory;
describe('Create Rental', () => {
    const Add24Hours = (0, dayjs_1.default)().add(25, 'hours').toDate();
    beforeEach(() => {
        dayJsProvider = new DayjsDateProvider_1.DayjsDateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInMemory);
    });
    it('should be able to create a new rental', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        });
        const rental = yield createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: Add24Hours
        });
        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    }));
    it('should not be able to create a new rental when there is another open to the same user', () => __awaiter(void 0, void 0, void 0, function* () {
        const car1 = yield carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        });
        const car2 = yield carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        });
        yield createRentalUseCase.execute({
            user_id: '12345',
            car_id: car1.id,
            expected_return_date: Add24Hours
        });
        yield expect(createRentalUseCase.execute({
            user_id: '12345',
            car_id: car2.id,
            expected_return_date: Add24Hours
        })).rejects.toEqual(new AppError_1.AppError("There's a rental in progress for this user!"));
    }));
    it('should not be able to create a new rental when there is another open to the same car', () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste_license_plate',
            fine_amount: 40,
            category_id: '1234',
            brand: 'test brand'
        });
        yield createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: Add24Hours
        });
        yield expect(createRentalUseCase.execute({
            user_id: '65321',
            car_id: car.id,
            expected_return_date: Add24Hours
        })).rejects.toEqual(new AppError_1.AppError('Car is unavailable'));
    }));
    it('should not be able to create a new rental with total rental time less than 24 hours', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createRentalUseCase.execute({
            user_id: '123',
            car_id: '121123',
            expected_return_date: (0, dayjs_1.default)().toDate()
        })).rejects.toEqual(new AppError_1.AppError(`The minimal rental time it's 24 hours`));
    }));
});
