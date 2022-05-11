"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsRepositoryInMemory = void 0;
const Car_1 = require("../../infra/typeorm/entities/Car");
class CarsRepositoryInMemory {
    constructor() {
        this.cars = [];
    }
    async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }) {
        const car = new Car_1.Car();
        Object.assign(car, {
            brand, category_id, daily_rate, description, fine_amount, name, license_plate
        });
        this.cars.push(car);
        return car;
    }
    async findByLicensePlate(license_plate) {
        return this.cars.find(c => c.license_plate === license_plate);
    }
    async findAvailable(brand, category_id, name) {
        return this.cars.filter(c => c.available === true ||
            ((brand && c.brand === brand) ||
                category_id && c.category_id === category_id ||
                name && c.name === name));
    }
    async findById(id) {
        return this.cars.find(c => c.id === id);
    }
    async updateAvailable(id, available) {
        const findIndex = this.cars.findIndex(c => c.id === id);
        this.cars[findIndex].available = available;
    }
}
exports.CarsRepositoryInMemory = CarsRepositoryInMemory;
