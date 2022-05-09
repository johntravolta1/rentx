"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("../../../../shared/container/providers/DayjsProvider/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayJsProvider;
let carsRepositoryInMemory;
describe('Create Rental', () => {
  const Add24Hours = (0, _dayjs.default)().add(25, 'hours').toDate();
  beforeEach(() => {
    dayJsProvider = new _DayjsDateProvider.DayjsDateProvider();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider, carsRepositoryInMemory);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'teste_license_plate',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test brand'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: Add24Hours
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental when there is another open to the same user', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'teste_license_plate',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test brand'
    });
    const car2 = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'teste_license_plate',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test brand'
    });
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car1.id,
      expected_return_date: Add24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: car2.id,
      expected_return_date: Add24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for this user!"));
  });
  it('should not be able to create a new rental when there is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'teste_license_plate',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test brand'
    });
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: Add24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: '65321',
      car_id: car.id,
      expected_return_date: Add24Hours
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental with total rental time less than 24 hours', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '123',
      car_id: '121123',
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError(`The minimal rental time it's 24 hours`));
  });
});