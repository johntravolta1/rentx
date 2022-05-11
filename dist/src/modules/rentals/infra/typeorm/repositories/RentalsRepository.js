"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsRepository = void 0;
const typeorm_1 = require("typeorm");
const Rental_1 = require("../entities/Rental");
class RentalsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Rental_1.Rental);
    }
    async findOpenRentalByCar(car_id) {
        return await this.repository.findOne({ where: { car_id, end_date: null } });
    }
    async findOpenRentalByUser(user_id) {
        return await this.repository.findOne({ where: { user_id, end_date: null } });
    }
    async create({ car_id, expected_return_date, user_id, id, end_date, total }) {
        const rental = await this.repository.create({ car_id, expected_return_date, user_id, id, end_date, total });
        await this.repository.save(rental);
        return rental;
    }
    findById(id) {
        return this.repository.findOne(id);
    }
    async findByUser(user_id) {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ['car']
        });
        return rentals;
    }
}
exports.RentalsRepository = RentalsRepository;
