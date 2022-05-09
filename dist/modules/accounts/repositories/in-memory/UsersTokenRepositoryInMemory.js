"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokenRepositoryInMemory = void 0;

var _UserTokens = require("../../infra/typeorm/entities/UserTokens");

class UsersTokenRepositoryInMemory {
  constructor() {
    this.usersToken = [];
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const usertoken = new _UserTokens.UserTokens();
    Object.assign(usertoken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersToken.push(usertoken);
    return usertoken;
  }

  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const usertoken = this.usersToken.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);
    return usertoken;
  }

  async deleteById(id) {
    const usertoken = this.usersToken.find(ut => ut.id === id);
    this.usersToken.splice(this.usersToken.indexOf(usertoken));
  }

  async findByRefreshToken(refresh_token) {
    return this.usersToken.find(ut => ut.refresh_token === refresh_token);
  }

}

exports.UsersTokenRepositoryInMemory = UsersTokenRepositoryInMemory;