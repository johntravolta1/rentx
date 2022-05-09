"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _index.default)();
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)('admin', 8);
  await connection.query(`INSERT INTO users (
            id, name, password, email, driver_license, "isAdmin", created_at, avatar)
            VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', '', true, 'now()', '');`);
  await connection.close();
}

create().then(() => console.log('user admin created!'));