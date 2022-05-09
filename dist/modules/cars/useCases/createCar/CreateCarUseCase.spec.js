"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createcarUseCase;
let carsRepositoryInMemory;
describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createcarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    const car = await createcarUseCase.execute({
      name: "Test Car",
      description: "Test Description",
      daily_rate: 100,
      license_plate: 'TEST1234',
      fine_amount: 60,
      brand: "Brand Test",
      category_id: 'test category'
    });
    expect(car).toHaveProperty('id');
  });
  it('should not be able to create a car with an existing license plate', async () => {
    await createcarUseCase.execute({
      name: "Test Car 1",
      description: "Test Description",
      daily_rate: 100,
      license_plate: 'TEST1234',
      fine_amount: 60,
      brand: "Brand Test",
      category_id: 'test category'
    });
    expect(createcarUseCase.execute({
      name: "Test Car 2",
      description: "Test Description",
      daily_rate: 100,
      license_plate: 'TEST1234',
      fine_amount: 60,
      brand: "Brand Test",
      category_id: 'test category'
    })).rejects.toEqual(new _AppError.AppError('Car already exists!'));
  });
  it('should be able to create a car with available true by default', async () => {
    const car = await createcarUseCase.execute({
      name: "Car Available",
      description: "Test Description",
      daily_rate: 100,
      license_plate: 'TEST1234',
      fine_amount: 60,
      brand: "Brand Test",
      category_id: 'test category'
    });
    expect(car.available).toBe(true);
  });
});