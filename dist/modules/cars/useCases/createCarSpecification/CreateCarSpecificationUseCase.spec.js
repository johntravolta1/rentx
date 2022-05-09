"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("../../repositories/in-memory/SpecificationsRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe('Create Car Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it('should not be able to add a new specification to a non-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError('Car does not exists!'));
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Test Description",
      daily_rate: 100,
      license_plate: 'TEST1234',
      fine_amount: 60,
      brand: "Brand Test",
      category_id: 'test category'
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test'
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBeGreaterThanOrEqual(1);
  });
});