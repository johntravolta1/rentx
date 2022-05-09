"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUseCase = void 0;

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("../../../../shared/container/providers/DayjsProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokenRepository = require("../../repositories/IUsersTokenRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokenRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersTokenRepository.IUsersTokenRepository === "undefined" ? Object : _IUsersTokenRepository.IUsersTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUseCase {
  constructor(usersTokenRepository, dateProvider, usersRepository) {
    this.usersTokenRepository = usersTokenRepository;
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepository;
  }

  async execute({
    token,
    password
  }) {
    const usertoken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!usertoken) {
      throw new _AppError.AppError('Token invalid!');
    }

    if (this.dateProvider.compareIfBefore(usertoken.expires_date, this.dateProvider.dateNow())) {
      throw new _AppError.AppError('Token is expired!');
    }

    const user = await this.usersRepository.findById(usertoken.user_id);
    user.password = await (0, _bcrypt.hash)(password, 8);
    await this.usersRepository.create(user);
    await this.usersTokenRepository.deleteById(usertoken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;