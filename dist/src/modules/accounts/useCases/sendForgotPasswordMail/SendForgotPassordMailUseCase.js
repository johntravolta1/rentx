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
exports.SendForgotMailUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
const uuid_1 = require("uuid");
const path_1 = require("path");
let SendForgotMailUseCase = class SendForgotMailUseCase {
    constructor(usersRepository, usersTokenRepository, dateProvider, mailProvider) {
        this.usersRepository = usersRepository;
        this.usersTokenRepository = usersTokenRepository;
        this.dateProvider = dateProvider;
        this.mailProvider = mailProvider;
    }
    async execute(email) {
        const user = await this.usersRepository.findByEmail(email);
        const templatePath = (0, path_1.resolve)(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
        if (!user) {
            throw new AppError_1.AppError('User does not exists!');
        }
        const token = (0, uuid_1.v4)();
        const expires_date = this.dateProvider.addHours(3);
        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        };
        await this.mailProvider.sendMail(email, 'Recupera????o de senha', variables, templatePath);
    }
};
SendForgotMailUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersTokenRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(3, (0, tsyringe_1.inject)('MailProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SendForgotMailUseCase);
exports.SendForgotMailUseCase = SendForgotMailUseCase;
