"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const index_1 = __importDefault(require("../index"));
async function create() {
    const connection = await (0, index_1.default)();
    const id = (0, uuid_1.v4)();
    const password = await (0, bcrypt_1.hash)('admin', 8);
    await connection.query(`INSERT INTO users (
            id, name, password, email, driver_license, "isAdmin", created_at, avatar)
            VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', '', true, 'now()', '');`);
    await connection.close();
}
create().then(() => console.log('user admin created!'));
