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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const tsyringe_1 = require("tsyringe");
const auth_1 = __importDefault(require("../../../../config/auth"));
const AppError_1 = require("../../../../shared/errors/AppError");
let AuthenticateUserUseCase = class AuthenticateUserUseCase {
    constructor(usersRepository, usersTokenRepository, dayJsDateProvider) {
        this.usersRepository = usersRepository;
        this.usersTokenRepository = usersTokenRepository;
        this.dayJsDateProvider = dayJsDateProvider;
    }
    async execute({ email, password }) {
        //Usuário existe
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError_1.AppError('Email or password incorrect'); //para o hacker não saber que o usuário não existe
        }
        // Senha está correta
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new AppError_1.AppError('Email or password incorrect'); //para o hacker não saber que o usuário não existe
        }
        //Gerar o token
        const token = (0, jsonwebtoken_1.sign)({}, auth_1.default.secret_token, {
            subject: user.id,
            expiresIn: auth_1.default.expires_in_token
        });
        const refresh_token = (0, jsonwebtoken_1.sign)({ email }, auth_1.default.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth_1.default.expires_in_refresh_token
        });
        const refresh_token_expires_date = this.dayJsDateProvider.addDays(auth_1.default.expires_refresh_token_days);
        await this.usersTokenRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });
        const tokenReturn = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        };
        return tokenReturn;
    }
};
AuthenticateUserUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UsersRepository")),
    __param(1, (0, tsyringe_1.inject)('UsersTokenRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthenticateUserUseCase);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
