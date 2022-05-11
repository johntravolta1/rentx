"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarSpecificationUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let CreateCarSpecificationUseCase = class CreateCarSpecificationUseCase {
    constructor(carRepository, specificationsRepository) {
        this.carRepository = carRepository;
        this.specificationsRepository = specificationsRepository;
    }
    async execute({ car_id, specifications_id }) {
        const carExists = await this.carRepository.findById(car_id);
        if (!carExists) {
            throw new AppError_1.AppError('Car does not exists!');
        }
        const specifications = await this.specificationsRepository.findByIds(specifications_id);
        carExists.specifications = specifications;
        await this.carRepository.create(carExists);
        return carExists;
    }
};
CreateCarSpecificationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('CarsRepository')),
    __param(1, (0, tsyringe_1.inject)('SpecificationsRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateCarSpecificationUseCase);
exports.CreateCarSpecificationUseCase = CreateCarSpecificationUseCase;
