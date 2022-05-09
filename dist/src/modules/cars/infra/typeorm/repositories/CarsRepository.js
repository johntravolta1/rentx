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
exports.CarsRepository = void 0;
const typeorm_1 = require("typeorm");
const Car_1 = require("../entities/Car");
class CarsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Car_1.Car);
    }
    create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.repository.create({
                brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id
            });
            yield this.repository.save(car);
            return car;
        });
    }
    findByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield this.repository.findOne({ license_plate });
            return car;
        });
    }
    findAvailable(brand, category_id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const carsQuery = yield this.repository.createQueryBuilder("c")
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
            return yield carsQuery.getMany();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne(id);
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.createQueryBuilder().update().set({ available }).where('id = :id').setParameters({ id }).execute();
        });
    }
}
exports.CarsRepository = CarsRepository;
