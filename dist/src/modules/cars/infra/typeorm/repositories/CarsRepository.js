"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsRepository = void 0;
const typeorm_1 = require("typeorm");
const Car_1 = require("../entities/Car");
class CarsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Car_1.Car);
    }
    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }) {
        const car = this.repository.create({
            brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id
        });
        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate) {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }
    async findAvailable(brand, category_id, name) {
        const carsQuery = await this.repository.createQueryBuilder("c")
            .where('available = :available', { available: true });
        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand });
        }
        if (name) {
            carsQuery.andWhere('c.name = :name', { name });
        }
        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id });
        }
        return await carsQuery.getMany();
    }
    async findById(id) {
        return this.repository.findOne(id);
    }
    async updateAvailable(id, available) {
        await this.repository.createQueryBuilder().update().set({ available }).where('id = :id').setParameters({ id }).execute();
    }
}
exports.CarsRepository = CarsRepository;
