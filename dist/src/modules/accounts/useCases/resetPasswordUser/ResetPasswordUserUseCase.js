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
exports.ResetPasswordUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let ResetPasswordUseCase = class ResetPasswordUseCase {
    constructor(usersTokenRepository, dateProvider, usersRepository) {
        this.usersTokenRepository = usersTokenRepository;
        this.dateProvider = dateProvider;
        this.usersRepository = usersRepository;
    }
    async execute({ token, password }) {
        const usertoken = await this.usersTokenRepository.findByRefreshToken(token);
        if (!usertoken) {
            throw new AppError_1.AppError('Token invalid!');
        }
        if (this.dateProvider.compareIfBefore(usertoken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError_1.AppError('Token is expired!');
        }
        const user = await this.usersRepository.findById(usertoken.user_id);
        user.password = await (0, bcrypt_1.hash)(password, 8);
        await this.usersRepository.create(user);
        await this.usersTokenRepository.deleteById(usertoken.id);
    }
};
ResetPasswordUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersTokenRepository')),
    __param(1, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(2, (0, tsyringe_1.inject)('UsersRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ResetPasswordUseCase);
exports.ResetPasswordUseCase = ResetPasswordUseCase;
