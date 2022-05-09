"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1649824475450 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsername1649824475450 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", 'username');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'username',
      type: 'varchar'
    }));
  }

}

exports.AlterUserDeleteUsername1649824475450 = AlterUserDeleteUsername1649824475450;