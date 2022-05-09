"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _IDateProvider = require("../../../../shared/container/providers/DayjsProvider/IDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IUsersTokenRepository = require("../../repositories/IUsersTokenRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokenRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('DayjsDateProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokenRepository.IUsersTokenRepository === "undefined" ? Object : _IUsersTokenRepository.IUsersTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(usersRepository, usersTokenRepository, dayJsDateProvider) {
    this.usersRepository = usersRepository;
    this.usersTokenRepository = usersTokenRepository;
    this.dayJsDateProvider = dayJsDateProvider;
  }

  async execute({
    email,
    password
  }) {
    //Usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError('Email or password incorrect'); //para o hacker não saber que o usuário não existe
    } // Senha está correta


    const passwordMatch = await (0, _bcrypt.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError('Email or password incorrect'); //para o hacker não saber que o usuário não existe
    } //Gerar o token


    const token = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dayJsDateProvider.addDays(_auth.default.expires_refresh_token_days);
    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
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

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;