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
exports.DevolutionRentalUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let DevolutionRentalUseCase = class DevolutionRentalUseCase {
    constructor(rentalsRepository, carsRepository, dateProvider) {
        this.rentalsRepository = rentalsRepository;
        this.carsRepository = carsRepository;
        this.dateProvider = dateProvider;
    }
    async execute({ id, user_id }) {
        const minimalRentalTimeInDays = 1;
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        if (!rental) {
            throw new AppError_1.AppError('Rental does not exists!');
        }
        let rentalTimeInDays = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow());
        if (rentalTimeInDays < minimalRentalTimeInDays) {
            rentalTimeInDays = 1;
        }
        const delay = this.dateProvider.compareInDays(this.dateProvider.dateNow(), rental.expected_return_date);
        let totalPrice = 0;
        let Fine = 0;
        if (delay > 0) {
            Fine = delay * car.fine_amount;
        }
        totalPrice = Fine + (rentalTimeInDays * car.daily_rate);
        rental.end_date = this.dateProvider.dateNow();
        rental.total = totalPrice;
        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);
        return rental;
    }
};
DevolutionRentalUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('RentalsRepository')),
    __param(1, (0, tsyringe_1.inject)('CarsRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], DevolutionRentalUseCase);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;
