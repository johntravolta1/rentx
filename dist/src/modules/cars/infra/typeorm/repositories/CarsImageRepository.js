"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsImageRepository = void 0;
const typeorm_1 = require("typeorm");
const CarImage_1 = require("../entities/CarImage");
class CarsImageRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(CarImage_1.CarImage);
    }
    async create(car_id, image_name) {
        const carImage = this.repository.create({
            car_id, image_name
        });
        await this.repository.save(carImage);
        return carImage;
    }
}
exports.CarsImageRepository = CarsImageRepository;
