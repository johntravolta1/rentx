"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _AppError = require("../../../errors/AppError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const userRepository = new _UsersRepository.UsersRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new _AppError.AppError('User is not an admin!');
  }

  return next();
}